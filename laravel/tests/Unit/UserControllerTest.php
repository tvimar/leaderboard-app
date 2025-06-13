<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Jobs\GenerateUserQrCode;
use Illuminate\Support\Facades\Bus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        Bus::fake();
    }

    /**
     * Test that index returns all users when database has users.
     *
     * @return void
     */
    public function test_index_returns_users_when_users_exist()
    {
        // Arrange
        $users = User::factory()->count(3)->create([
            'score' => 0 // Ensure score is initialized to 0
        ]);

        // Act
        $response = $this->getJson('/api/users');

        // Assert
        $response->assertStatus(200)
                ->assertJsonCount(3)
                ->assertJson($users->toArray());
    }

    /**
     * Test that index returns empty array when no users exist.
     *
     * @return void
     */
    public function test_index_returns_empty_array_when_no_users()
    {
        // Act
        $response = $this->getJson('/api/users');

        // Assert
        $response->assertStatus(200)
                ->assertJson([])
                ->assertJsonCount(0);
    }

    /**
     * Test successful user creation with valid data.
     */
    public function test_store_creates_user_with_valid_data()
    {
        // Prevent the job from actually running
        Bus::fake();

        // Arrange
        $userData = [
            'name' => 'John Doe',
            'age' => 25,
            'address' => '123 Test St'
        ];

        // Act
        $response = $this->postJson('/api/users', $userData);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'name' => 'John Doe',
                'age' => 25,
                'address' => '123 Test St',
                'score' => 0
            ]);

        // Assert user was created in database
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'age' => 25,
            'address' => '123 Test St',
            'score' => 0
        ]);

        // Assert QR code job was dispatched
        Bus::assertDispatched(GenerateUserQrCode::class, function ($job) {
            return $job->userid === User::first()->id &&
                   $job->address === '123 Test St';
        });
    }

    /**
     * Test validation failures when creating user.
     *
     * @dataProvider invalidUserDataProvider
     */
    public function test_store_fails_with_invalid_data($userData, $expectedErrors)
    {
        // Act
        $response = $this->postJson('/api/users', $userData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonValidationErrors($expectedErrors);

        // Assert no user was created
        $this->assertDatabaseCount('users', 0);
    }

    /**
     * Provide test cases for invalid user data
     */
    public static function invalidUserDataProvider()
    {
        return [
            'missing name' => [
                ['age' => 25, 'address' => '123 Test St'],
                ['name']
            ],
            'missing age' => [
                ['name' => 'John Doe', 'address' => '123 Test St'],
                ['age']
            ],
            'negative age' => [
                ['name' => 'John Doe', 'age' => -1, 'address' => '123 Test St'],
                ['age']
            ],
            'missing address' => [
                ['name' => 'John Doe', 'age' => 25],
                ['address']
            ],
            'empty name' => [
                ['name' => '', 'age' => 25, 'address' => '123 Test St'],
                ['name']
            ],
            'name too long' => [
                ['name' => str_repeat('a', 256), 'age' => 25, 'address' => '123 Test St'],
                ['name']
            ]
        ];
    }

    /**
     * Test successful user score update.
     */
    public function test_update_user_score_with_valid_data()
    {
        // Arrange
        $user = User::factory()->create(['score' => 0]);
        $updateData = ['score' => 10];

        // Act
        $response = $this->putJson("/api/users/{$user->id}", $updateData);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'id' => $user->id,
                'score' => 10
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'score' => 10
        ]);
    }

    /**
     * Test user score update with invalid data.
     */
    public function test_update_user_score_with_invalid_data()
    {
        // Arrange
        $user = User::factory()->create(['score' => 5]);
        $invalidData = ['score' => -1]; // Score cannot be negative

        // Act
        $response = $this->putJson("/api/users/{$user->id}", $invalidData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['score']);

        // Verify score wasn't changed
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'score' => 5
        ]);
    }

    /**
     * Test successful user deletion.
     */
    public function test_destroy_existing_user()
    {
        // Arrange
        $user = User::factory()->create([
            'name' => 'John Doe',
            'age' => 25,
            'address' => '123 Test St',
            'score' => 0
        ]);

        // Act
        $response = $this->deleteJson("/api/users/{$user->id}");

        // Assert
        $response->assertStatus(204); // No content response
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertDatabaseCount('users', 0);
    }

    /**
     * Test deletion of non-existent user.
     */
    public function test_destroy_non_existent_user()
    {
        // Act
        $response = $this->deleteJson("/api/users/999");

        // Assert
        $response->assertStatus(404);
        $this->assertDatabaseCount('users', 0);
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

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
}

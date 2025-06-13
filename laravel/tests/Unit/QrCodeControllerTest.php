<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class QrCodeControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    /**
     * Test index returns list of QR codes when files exist.
     */    public function test_index_returns_qr_codes_when_files_exist()
    {
        // Arrange
        Storage::put('qr/test1.png', 'fake-image-content-1');
        Storage::put('qr/test2.png', 'fake-image-content-2');

        // Act
        $response = $this->getJson('/api/qr-codes');

        // Assert
        $response->assertStatus(200)
                ->assertJson(['qr/test1.png', 'qr/test2.png']);
    }

    /**
     * Test index returns empty array when no QR codes exist.
     */    public function test_index_returns_empty_array_when_no_files()
    {
        // Act
        $response = $this->getJson('/api/qr-codes');

        // Assert
        $response->assertStatus(200)
                ->assertJson([])
                ->assertJsonCount(0);
    }    
    
    /**
     * Test show returns QR code image when file exists.
     */
    public function test_show_returns_qr_code_when_file_exists()
    {
        // Arrange
        $filename = 'test.png';
        $fakeImageContent = 'fake-image-content';
        Storage::put('qr/' . $filename, $fakeImageContent);

        // Act
        $response = $this->get("/api/qr-codes/{$filename}");

        // Assert
        $response->assertStatus(200)
                ->assertHeader('Content-Type', 'image/png')
                ->assertHeader('Cache-Control', 'max-age=3600, public');
        
        $this->assertEquals($fakeImageContent, $response->getContent());
    }    
    
    /**
     * Test show returns 404 when file doesn't exist.
     */
    public function test_show_returns_404_when_file_not_found()
    {
        // Act
        $response = $this->getJson('/api/qr-codes/nonexistent.png');

        // Assert
        $response->assertStatus(404)
                ->assertJson(['error' => 'File not found']);
    }
}

<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class GenerateUserQrCode implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $userid;
    public $address;

    /**
     * Create a new job instance.
     */
    public function __construct($userid, $address)
    {
        $this->userid = $userid;
        $this->address = $address;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $encodedAddress = urlencode($this->address);
        
        // Get the user's first name and current timestamp
        $user = \App\Models\User::find($this->userid);
        $firstName = explode(' ', $user->name)[0];  // Get first name
        $timestamp = now()->format('Y-m-d_H-i-s');  // Format: YYYY-MM-DD_HH-mm-ss
        $fileName = $firstName . '_' . $timestamp . '.png';
        
        $url = 'https://api.qrserver.com/v1/create-qr-code/?data=' . $encodedAddress . '&size=150x150';
        // // remember to copy cacert.pem to server to make this work
        $qrresponse = Http::get($url);
        $imageContent = $qrresponse->body(); // This is the image binary 
        $saved = Storage::put('qr/' . $fileName, $imageContent);
        if (!$saved) {
            Log::error('Failed to save QR image: ' . $fileName);
        }
    }
}

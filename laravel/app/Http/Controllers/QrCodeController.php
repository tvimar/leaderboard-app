<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class QrCodeController extends Controller
{
    /**
     * Get a list of all QR codes
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $files = Storage::files('qr');
        return response()->json($files);
    }

    /**
     * Get a specific QR code image
     *
     * @param string $filename
     * @return \Illuminate\Http\Response
     */
    public function show($filename)
    {
        if (Storage::exists('qr/' . $filename)) {
            $file = Storage::get('qr/' . $filename);
            return response($file)
                ->header('Content-Type', 'image/png')
                ->header('Cache-Control', 'public, max-age=3600');
        }
        return response()->json(['error' => 'File not found'], 404);
    }
}

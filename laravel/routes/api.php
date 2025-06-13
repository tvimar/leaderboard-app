<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
Route::put('/reset-scores', [UserController::class, 'resetAllUserScores'])->name('users.reset-scores');
Route::get('/users-by-score', [UserController::class, 'getUsersGroupedByScore'])->name('users.by-score');
Route::get('/current-winner', [UserController::class, 'currentWinner'])->name('users.current-winner');

Route::get('/qr-codes', function () {
    $files = Storage::files('qr');
    return response()->json($files);
});

Route::get('/qr-codes/{filename}', function ($filename) {
    if (Storage::exists('qr/' . $filename)) {
        $file = Storage::get('qr/' . $filename);
        return response($file)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'public, max-age=3600');
    }
    return response()->json(['error' => 'File not found'], 404);
});
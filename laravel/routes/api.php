<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QrCodeController;

Route::apiResource('users', UserController::class);
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
Route::put('/reset-scores', [UserController::class, 'resetAllUserScores'])->name('users.reset-scores');
Route::get('/users-by-score', [UserController::class, 'getUsersGroupedByScore'])->name('users.by-score');
Route::get('/current-winner', [UserController::class, 'currentWinner'])->name('users.current-winner');

// QR Code routes
Route::get('/qr-codes', [QrCodeController::class, 'index'])->name('qrcodes.index');
Route::get('/qr-codes/{filename}', [QrCodeController::class, 'show'])->name('qrcodes.show');
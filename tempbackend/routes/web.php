<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// API routes
Route::prefix('api')->group(function () {
    Route::get('/leaderboard', 'LeaderboardController@index');
    Route::post('/leaderboard', 'LeaderboardController@store');
});
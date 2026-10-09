<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\WelcomeController::class);
Route::get('/post/{post:slug}', \App\Http\Controllers\PostShowController::class);
Route::apiResource('dashboard/posts', \App\Http\Controllers\PostController::class)
    ->middleware(['auth:sanctum'])
    ->except(['create', 'edit']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', function (Request $request) {
    return User::all();
});

Route::get('/403', function () {
    return response()->json(['message' => 'Forbidden'], 403);
});

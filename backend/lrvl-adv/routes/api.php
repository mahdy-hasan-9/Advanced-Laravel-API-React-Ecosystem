<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return response()->json([
        'message' => 'hello from laravel api',
        'status' => 200
    ]);
});

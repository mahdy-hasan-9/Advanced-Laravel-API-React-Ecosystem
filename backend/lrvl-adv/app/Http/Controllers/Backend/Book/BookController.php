<?php

namespace App\Http\Controllers\Backend\Book;

use App\Http\Controllers\Controller;
use App\Http\Resources\Backend\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function bookList() {
           return response()->json([
            'success' => true,
            'status' => 200,
            'data' => BookResource::collection(Book::get()),
            'message' => 'Class List'
        ], 200);
    }
}

<?php

namespace App\Http\Controllers\Backend\Class;

use App\Http\Controllers\Controller;
use App\Http\Resources\Backend\ClassResource;
use App\Models\ClassModel;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function classList()
    {
        return response()->json([
            'success' => true,
            'status' => 200,
            'data' => ClassResource::collection(ClassModel::get()),
            'message' => 'Class List'
        ], 200);
    }
}

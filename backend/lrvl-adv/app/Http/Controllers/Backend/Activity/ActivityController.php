<?php

namespace App\Http\Controllers\Backend\Activity;

use App\Http\Controllers\Controller;
use App\Http\Resources\Backend\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function activities() {
         return response()->json([
            'success' => true,
            'status' => 200,
            'data' => ActivityResource::collection(Activity::get()),
            'message' => 'Class List'
        ], 200);
    }
}

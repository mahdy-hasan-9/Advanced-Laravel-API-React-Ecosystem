<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    protected $fillable = ['name','level','is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'level' => 'integer',
    ];
}

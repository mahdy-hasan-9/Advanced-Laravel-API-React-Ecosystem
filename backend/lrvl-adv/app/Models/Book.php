<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['name','is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function students(){
        return $this->belongsToMany(Student::class,'book_student','book_id','student_id');
    }
}

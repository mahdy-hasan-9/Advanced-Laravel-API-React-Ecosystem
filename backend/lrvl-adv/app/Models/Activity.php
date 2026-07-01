<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function students(){
        return $this->belongsToMany(Student::class,'activity_student','activity_id','student_id');
    }
}

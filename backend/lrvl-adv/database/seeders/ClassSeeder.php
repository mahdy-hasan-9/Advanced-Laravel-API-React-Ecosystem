<?php

namespace Database\Seeders;

use App\Models\ClassModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    public function run(): void
    {
        $classes = [];
        for ($i = 1; $i <= 12; $i++) {
            $classes[] = [
                'name' => "Class {$i}",
                'level' => $i,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        
        ClassModel::insert($classes);
    }
}

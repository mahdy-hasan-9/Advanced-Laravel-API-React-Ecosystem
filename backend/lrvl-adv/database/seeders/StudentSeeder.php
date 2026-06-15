<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Book;
use App\Models\ClassModel;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $classes = ClassModel::all();
        $activities = Activity::all();
        $books = Book::all();

        if ($classes->isEmpty() || $activities->isEmpty() || $books->isEmpty()) {
            return;
        }

        for ($i = 0; $i < 80; $i++) {
            $student = Student::create([
                'name' => fake()->name(),
                'age' => fake()->numberBetween(18, 25),
                'gender' => fake()->randomElement(['male', 'female']),
                'image_url' => null,
                'image_removed' => false,
                'is_active' => true,
                'address' => fake()->address(),
                'class_id' => $classes->random()->id,
            ]);

            $student->activities()->sync(
                $activities->random(fake()->numberBetween(1, 3))->pluck('id')->toArray()
            );

            $student->books()->sync(
                $books->random(fake()->numberBetween(0, 3))->pluck('id')->toArray()
            );
        }
    }
}

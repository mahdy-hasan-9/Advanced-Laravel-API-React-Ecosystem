<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            ['name' => 'Adventure'],
            ['name' => 'Detective'],
            ['name' => 'Love Story'],
            ['name' => 'Science'],
            ['name' => 'Fantasy'],
            ['name' => 'Horror'],
            ['name' => 'Biography'],
            ['name' => 'History'],
            ['name' => 'Mystery'],
            ['name' => 'Thriller'],
        ];

        foreach ($books as $key => $book) {
            Book::create([
                'name' => $book['name'] , 
                'is_active' => 1 , 
            ]);
        }

    }
}

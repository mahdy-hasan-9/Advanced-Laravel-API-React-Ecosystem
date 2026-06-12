<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => "Ajax",
            'email' => "ajax@gmail.com",
            'password' => Hash::make('Password8'),
            'is_active' => 1,
        ]);
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "User $i",
                'email' => "user$i@gmail.com",
                'password' => Hash::make('Password8'),
                'is_active' => 1,
            ]);
        }
    }
}

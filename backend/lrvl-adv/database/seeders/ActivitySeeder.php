<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activities = [
            'Good Student',
            'Games',
            'Artistic',
            'Scientific',
            'Engineer',
            'Aesthetic',
        ];

        foreach ($activities as $key => $activity) {
            Activity::create([
                'name' => $activity,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

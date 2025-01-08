<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'surname' => 'Test Surname',
            'email' => 'test@example.com',
        ]);

        $this->call([
            CategoriesTableSeeder::class
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Transport',
                'description' => 'Public transport, car expenses, fuel',
                'icon' => 'car',
                'color' => '#4A90E2'
            ],
            [
                'name' => 'Utilities',
                'description' => 'Electricity, water, gas, internet',
                'icon' => 'bolt',
                'color' => '#F5A623'
            ],
            [
                'name' => 'Entertainment',
                'description' => 'Movies, games, hobbies',
                'icon' => 'film',
                'color' => '#7ED321'
            ],
            [
                'name' => 'Savings',
                'description' => 'Money set aside for future use',
                'icon' => 'piggy-bank',
                'color' => '#50E3C2'
            ],
            [
                'name' => 'Investments',
                'description' => 'Stocks, bonds, mutual funds',
                'icon' => 'chart-line',
                'color' => '#BD10E0'
            ],
            [
                'name' => 'Debt',
                'description' => 'Credit cards, loans, mortgages',
                'icon' => 'credit-card',
                'color' => '#D0021B'
            ],
            [
                'name' => 'Health',
                'description' => 'Medical expenses, pharmacy, fitness',
                'icon' => 'heart',
                'color' => '#E74C3C'
            ],
            [
                'name' => 'Education',
                'description' => 'Courses, books, training',
                'icon' => 'graduation-cap',
                'color' => '#8E44AD'
            ],
            [
                'name' => 'Travel',
                'description' => 'Vacations, business trips',
                'icon' => 'plane',
                'color' => '#3498DB'
            ],
            [
                'name' => 'Gifts',
                'description' => 'Presents, donations, charity',
                'icon' => 'gift',
                'color' => '#E91E63'
            ],
            [
                'name' => 'Miscellaneous',
                'description' => 'Other uncategorized expenses',
                'icon' => 'ellipsis-h',
                'color' => '#95A5A6'
            ],
            [
                'name' => 'Clothing',
                'description' => 'Clothes, shoes, accessories',
                'icon' => 'tshirt',
                'color' => '#FF9800'
            ],
            [
                'name' => 'Housing',
                'description' => 'Rent, mortgage, maintenance',
                'icon' => 'home',
                'color' => '#795548'
            ],
            [
                'name' => 'Insurance',
                'description' => 'Health, life, property insurance',
                'icon' => 'shield-alt',
                'color' => '#607D8B'
            ],
            [
                'name' => 'Taxes',
                'description' => 'Income tax, property tax',
                'icon' => 'file-invoice-dollar',
                'color' => '#FF5722'
            ],
            [
                'name' => 'Subscriptions',
                'description' => 'Streaming services, memberships',
                'icon' => 'sync',
                'color' => '#009688'
            ],
            [
                'name' => 'Grocery',
                'description' => 'Food, household supplies',
                'icon' => 'shopping-cart',
                'color' => '#4CAF50'
            ],
            [
                'name' => 'Restaurant',
                'description' => 'Dining out, takeaway',
                'icon' => 'utensils',
                'color' => '#FFC107'
            ],
            [
                'name' => 'Pet',
                'description' => 'Pet food, vet, supplies',
                'icon' => 'paw',
                'color' => '#795548'
            ],
            [
                'name' => 'Other',
                'description' => 'Miscellaneous expenses',
                'icon' => 'question',
                'color' => '#9E9E9E'
            ],
        ]);
    }
}


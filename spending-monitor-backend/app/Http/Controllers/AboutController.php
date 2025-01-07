<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        return response()->json([
            'title' => 'About SpendingMonitor',
            'description' => 'SpendingMonitor helps you track and manage your personal finances with ease.',
            'features' => [
                'Expense Tracking',
                'Budget Management',
                'Financial Reports',
                'Category Management',
                'Goal Setting'
            ],
            'version' => '1.0.0'
        ]);
    }
} 
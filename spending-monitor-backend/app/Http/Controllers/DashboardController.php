<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $user = Auth::user();
        
        // Here you would typically gather dashboard data
        // This is just example data - implement your actual logic
        return response()->json([
            'user' => $user,
            'summary' => [
                'total_expenses' => 0,
                'total_budget' => 0,
                'total_savings' => 0,
                'categories' => []
            ],
            'recent_transactions' => [],
            'monthly_overview' => [
                'expenses' => [],
                'budget' => [],
                'savings' => []
            ]
        ]);
    }
} 
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Bill;
use Carbon\Carbon; // for date and time

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        try {
            $user = auth()->user();
            $currentMonth = now()->startOfMonth();

            $summary = [
                'total_budget' => (float) $user->monthly_budget ?? 0,
                'total_expenses' => (float) $user->expenses()
                    ->whereMonth('date', $currentMonth->month)
                    ->whereYear('date', $currentMonth->year)
                    ->sum('amount'),
                'remaining_budget' => 0, // Will calculate below
            ];

            // Calculate remaining budget
            $summary['remaining_budget'] = $summary['total_budget'] - $summary['total_expenses'];

            // Get category breakdown
            $categories = Category::with(['expenses' => function ($query) use ($currentMonth) {
                $query->whereMonth('date', $currentMonth->month)
                      ->whereYear('date', $currentMonth->year);
            }])->get()->map(function ($category) {
                return [
                    'name' => $category->name,
                    'icon' => $category->icon,
                    'color' => $category->color,
                    'total' => (float) $category->expenses->sum('amount')
                ];
            });

            // Get recent transactions
            $recent_transactions = $user->expenses()
                ->with('category')
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($expense) {
                    return [
                        'id' => $expense->id,
                        'amount' => (float) $expense->amount,
                        'currency' => $expense->currency ?? 'EUR', // Default currency
                        'date' => $expense->date->format('Y-m-d'), // Format date
                        'location' => $expense->location ?? null,
                        'description' => $expense->description ?? null,
                        'payment_method' => $expense->payment_method ?? null,
                        'receipt_image' => $expense->receipt_image ?? null,
                        'category' => [
                            'name' => $expense->category->name ?? 'Uncategorized',
                            'color' => $expense->category->color ?? '#808080',
                            'icon' => $expense->category->icon ?? '📝'
                        ]
                    ];
                });

            return response()->json([
                'summary' => [
                    ...$summary,
                    'categories' => $categories
                ],
                'recent_transactions' => $recent_transactions,
                'upcoming_bills' => [] // Add your bills logic here if needed
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to load dashboard data'], 500);
        }
    }
} 
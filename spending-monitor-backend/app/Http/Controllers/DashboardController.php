<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Bill;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        try {
            $user = Auth::user();
            $currentMonth = Carbon::now();
            
            // Get monthly totals for current month
            $monthlyExpenses = Expense::where('user_id', $user->id)
                ->whereYear('date', $currentMonth->year)
                ->whereMonth('date', $currentMonth->month)
                ->sum('amount');

            // Get monthly budget (using start_date for the month)
            $monthlyBudget = Budget::where('user_id', $user->id)
                ->whereYear('start_date', $currentMonth->year)
                ->whereMonth('start_date', $currentMonth->month)
                ->sum('amount');

            // Get category breakdown
            $categoryExpenses = Category::with(['expenses' => function($query) use ($user, $currentMonth) {
                $query->where('user_id', $user->id)
                      ->whereYear('date', $currentMonth->year)
                      ->whereMonth('date', $currentMonth->month);
            }])
            ->get()
            ->map(function($category) {
                return [
                    'name' => $category->name,
                    'total' => $category->expenses->sum('amount'),
                    'color' => $category->color,
                    'icon' => $category->icon
                ];
            });

            // Get recent transactions
            $recentTransactions = Expense::with('category')
                ->where('user_id', $user->id)
                ->orderBy('date', 'desc')
                ->take(5)
                ->get();

            // Get upcoming bills
            $upcomingBills = Bill::where('user_id', $user->id)
                ->where('due_date', '>=', now())
                ->orderBy('due_date')
                ->take(5)
                ->get();

            return response()->json([
                'summary' => [
                    'total_expenses' => $monthlyExpenses,
                    'total_budget' => $monthlyBudget,
                    'remaining_budget' => $monthlyBudget - $monthlyExpenses,
                    'categories' => $categoryExpenses
                ],
                'recent_transactions' => $recentTransactions,
                'upcoming_bills' => $upcomingBills,
                'current_month' => $currentMonth->format('F Y')
            ]);

        } catch (\Exception $e) {
            \Log::error('Dashboard error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 
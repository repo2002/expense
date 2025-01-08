<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\GoalController;
use Illuminate\Support\Facades\Mail;
// React app route
Route::get('/', function () {
    return view('app');
});

// Auth routes
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/about', [AboutController::class, 'index']);
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    
    // Profile routes
    Route::get('/user', [ProfileController::class, 'show']);
    Route::put('/user/profile', [ProfileController::class, 'update']);
    Route::put('/user/password', [ProfileController::class, 'updatePassword']);

    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index']);    
    
    // Bill routes
    Route::apiResource('bills', BillController::class);
    
    // Budget routes
    Route::apiResource('budgets', BudgetController::class);
    
    // Category routes
    Route::apiResource('categories', CategoryController::class);
    
    // Expense routes
    Route::apiResource('expenses', ExpenseController::class);
    
    // Goal routes
    Route::apiResource('goals', GoalController::class);
});

// Password Reset Routes
Route::get('/reset-password/{token}', function ($token) {
    return view('app', ['token' => $token]);
})->middleware('guest')->name('password.reset');

// Catch-all Route for React
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');



Route::get('/check-auth', function () {
    return response()->json([
        'user' => auth()->user(),
        'id' => auth()->id(),
        'check' => auth()->check()
    ]);
});

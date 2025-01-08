<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ExpenseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:0',
                'currency' => 'required|string|size:3',
                'date' => 'required|date',
                'category_id' => 'required|exists:categories,id',
                'payment_method' => 'nullable|string',
                'location' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'is_recurring' => 'boolean',
                'recurring_frequency' => 'nullable|string|in:weekly,monthly,yearly',
                'recurring_end_date' => 'nullable|date|after_or_equal:date',
                'receipt_image' => 'nullable|file|image|max:2048', // 2MB max
                'tags' => 'nullable|json'
            ]);

            $expense = new Expense();
            
            // Handle basic fields
            $expense->user_id = auth()->id();
            $expense->amount = $validated['amount'];
            $expense->currency = $validated['currency'];
            $expense->date = $validated['date'];
            $expense->category_id = $validated['category_id'];
            $expense->payment_method = $validated['payment_method'] ?? null;
            $expense->location = $validated['location'] ?? null;
            $expense->description = $validated['description'] ?? null;
            
            // Handle recurring fields
            $expense->is_recurring = $validated['is_recurring'] ?? false;
            if ($expense->is_recurring) {
                $expense->recurring_frequency = $validated['recurring_frequency'];
                $expense->recurring_end_date = $validated['recurring_end_date'];
            }

            // Handle receipt image
            if ($request->hasFile('receipt_image')) {
                $path = $request->file('receipt_image')->store('receipts', 'public');
                $expense->receipt_image = $path;
            }

            $expense->save();

            return response()->json([
                'message' => 'Expense created successfully',
                'expense' => $expense
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating expense: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating expense',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 
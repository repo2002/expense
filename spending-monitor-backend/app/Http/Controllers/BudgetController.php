<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function index()
    {
        // Get all budgets
        return response()->json(['message' => 'List all budgets']);
    }

    public function store(Request $request)
    {
        // Create new budget
        return response()->json(['message' => 'Create new budget']);
    }

    public function show($id)
    {
        // Show specific budget
        return response()->json(['message' => 'Show budget ' . $id]);
    }

    public function update(Request $request, $id)
    {
        // Update specific budget
        return response()->json(['message' => 'Update budget ' . $id]);
    }

    public function destroy($id)
    {
        // Delete specific budget
        return response()->json(['message' => 'Delete budget ' . $id]);
    }
} 
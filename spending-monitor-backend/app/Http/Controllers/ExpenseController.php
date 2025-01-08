<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        // Get all expenses
        return response()->json(['message' => 'List all expenses']);
    }

    public function store(Request $request)
    {
        // Create new expense
        return response()->json(['message' => 'Create new expense']);
    }

    public function show($id)
    {
        // Show specific expense
        return response()->json(['message' => 'Show expense ' . $id]);
    }

    public function update(Request $request, $id)
    {
        // Update specific expense
        return response()->json(['message' => 'Update expense ' . $id]);
    }

    public function destroy($id)
    {
        // Delete specific expense
        return response()->json(['message' => 'Delete expense ' . $id]);
    }
} 
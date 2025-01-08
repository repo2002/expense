<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GoalController extends Controller
{
    public function index()
    {
        // Get all goals
        return response()->json(['message' => 'List all goals']);
    }

    public function store(Request $request)
    {
        // Create new goal
        return response()->json(['message' => 'Create new goal']);
    }

    public function show($id)
    {
        // Show specific goal
        return response()->json(['message' => 'Show goal ' . $id]);
    }

    public function update(Request $request, $id)
    {
        // Update specific goal
        return response()->json(['message' => 'Update goal ' . $id]);
    }

    public function destroy($id)
    {
        // Delete specific goal
        return response()->json(['message' => 'Delete goal ' . $id]);
    }
} 
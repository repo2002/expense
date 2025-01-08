<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BillController extends Controller
{
    public function index()
    {
        // Get all bills
        return response()->json(['message' => 'List all bills']);
    }

    public function store(Request $request)
    {
        // Create new bill
        return response()->json(['message' => 'Create new bill']);
    }

    public function show($id)
    {
        // Show specific bill
        return response()->json(['message' => 'Show bill ' . $id]);
    }

    public function update(Request $request, $id)
    {
        // Update specific bill
        return response()->json(['message' => 'Update bill ' . $id]);
    }

    public function destroy($id)
    {
        // Delete specific bill
        return response()->json(['message' => 'Delete bill ' . $id]);
    }
} 
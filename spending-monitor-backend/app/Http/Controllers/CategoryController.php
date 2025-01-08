<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        // Get all categories
        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        // Create new category
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string'
        ]);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    public function show($id)
    {
        // Show specific category
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        // Update specific category
        $category = Category::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string'
        ]);

        $category->update($validated);
        return response()->json($category);
    }

    public function destroy($id)
    {
        // Delete specific category
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
} 
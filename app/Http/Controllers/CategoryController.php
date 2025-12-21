<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('admin/addProducts', [
            'categories' => $categories
        ]);
    }
     public function homeCategories()
    {
        $categories = Category::all();
        return Inertia::render('Home', [
            'categories' => $categories
        ]);
    }
    public function create()
{
    $categories = Category::all();

    return Inertia::render('admin/addCategory', [
        'categoriesList' => $categories
    ]);
}

public function store(Request $request)
{
    $request->validate([
        'name'  => 'required|string|unique:categories,name',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    $imagePath = null;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('categories', 'public');
    }

    Category::create([
        'name'  => $request->name,
        'image' => $imagePath,
    ]);

    return redirect()->back()->with('success', 'Kategoriya muvaffaqiyatli qo‘shildi!');
}

}


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

    public function create()
    {
        return Inertia::render('admin/addCategory');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
        ]);

        Category::create([
            'name' => $request->name,
        ]);

        return redirect()->back()->with('success', 'Kategoriya muvaffaqiyatli qo‘shildi!');
    }
}


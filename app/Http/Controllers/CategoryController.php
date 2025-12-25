<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
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
        return Inertia::render('Home', [
            'categories' => Category::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/addCategory', [
            'categoriesList' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|unique:categories,name',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('categories', 'public')
            : null;

        Category::create([
            'name'  => $request->name,
            'image' => $imagePath,
        ]);

        return back()->with('success', 'Kategoriya muvaffaqiyatli qo‘shildi!');
    }

    /**
     * ✅ CATEGORY + FILTER ISHLAYDIGAN SHOW
     */
    public function show($id)
    {
        $category   = Category::findOrFail($id);
        $categories = Category::all(); // 🔥 FILTER UCHUN MUHIM
        $products = Product::where('category_id', $id)
            ->with(['category', 'variants'])
            ->get()
            ->map(function ($product) {

                // Rasmlar
                $images = [];
                if ($product->photo1) $images[] = $product->photo1;
                if ($product->photo2) $images[] = $product->photo2;
                if ($product->photo3) $images[] = $product->photo3;

                $product->images = $images;

                return $product;
            });

        return Inertia::render('CategoryProducts', [
            'category'   => $category,
            'categories' => $categories, // ✅ FILTER
            'products'   => $products
        ]);
    }
}

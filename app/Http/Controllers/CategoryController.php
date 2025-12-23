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

        return redirect()->back()->with('success', 'Kategoriya muvaffaqiyatli qo\'shildi!');
    }

    /**
     * Kategoriya bo'yicha mahsulotlarni ko'rsatish
     */
    public function show($id)
    {
        // Kategoriyani topish
        $category = Category::findOrFail($id);
        
        // Kategoriyaga tegishli mahsulotlarni olish
        $products = Product::where('category_id', $id)
            ->with('category')
            ->get()
            ->map(function($product) {
                // Photo1, photo2, photo3 ni bitta images array ga yig'ish
                $photos = [];
                if (!empty($product->photo1)) $photos[] = $product->photo1;
                if (!empty($product->photo2)) $photos[] = $product->photo2;
                if (!empty($product->photo3)) $photos[] = $product->photo3;
                
                $product->images = $photos;
                
                // Debug uchun
                \Log::info('Product: ' . $product->product_name);
                \Log::info('Photos array: ' . json_encode($photos));
                
                return $product;
            });
        
        // Debug uchun
        \Log::info('Category ID: ' . $id);
        \Log::info('Products count: ' . $products->count());
        
        return Inertia::render('CategoryProducts', [
            'category' => $category,
            'products' => $products
        ]);
    }
}
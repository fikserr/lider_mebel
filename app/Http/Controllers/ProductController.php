<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

class ProductController extends Controller
{
    public function showProduct()
    {
        $products = Product::with(['category', 'variants'])->latest()->paginate(5);
        return Inertia::render('admin/productStock', [
            'products' => $products,
        ]);
    }

    public function clothesProducts($id)
    {
        $products = Product::with(['category', 'variants'])
            ->where('category_id', $id)
            ->get();

        $categories = Category::all(); // Barcha kategoriyalarni olish

        return Inertia::render('Clothes', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }


    public function ShoesProducts($id)
    {
        $products = Product::with('category', 'variants')
            ->where('category_id', $id) // dinamik kategoriya
            ->get();
        $categories = Category::all(); // Barcha kategoriyalarni olish
        return Inertia::render('Shoes', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function AccesProducts($id)
    {
        $products = Product::with('category', 'variants')
            ->where('category_id', $id) // dinamik kategoriya
            ->get();
        $categories = Category::all(); // Barcha kategoriyalarni olish
        return Inertia::render('Accessory', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
    public function userProduct()
    {
        $banners = \App\Models\Banner::latest()->get();
        $products = Product::with('category', 'variants')->get(); // kerak bo‘lsa filter, search keyin qo‘shamiz
        $favorites = Auth::user()->favorites;

        return Inertia::render('Home', [
            'products' => $products,
            'banners' => $banners,
            'favorites' => $favorites,
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'variants'])->findOrFail($id);
        return Inertia::render('detail', [
            'detail' => $product,
        ]);
    }

    public function create()
    {
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('admin/addProducts', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brend' => 'nullable|string|max:255',
            'photo1' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'photo2' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'photo3' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'variants' => 'required|array',
            'variants.*.price' => 'required|numeric',
            'variants.*.sizes' => 'required|array',
            'variants.*.colors' => 'required|array',
        ]);

        foreach ([1, 2, 3] as $i) {
            $field = 'photo' . $i;
            if ($request->hasFile($field)) {
                $data[$field] = $request->file($field)->store('products', 'public');
            }
        }

        // Productni yaratamiz
        $product = Product::create([
            'product_name' => $data['product_name'],
            'category_id' => $data['category_id'],
            'brend' => $data['brend'] ?? null,
            'photo1' => $data['photo1'] ?? null,
            'photo2' => $data['photo2'] ?? null,
            'photo3' => $data['photo3'] ?? null,
        ]);

        // Variantlarini saqlaymiz
        foreach ($data['variants'] as $variant) {
            $product->variants()->create([
                'sizes' => $variant['sizes'],
                'colors' => $variant['colors'],
                'price' => $variant['price'],
            ]);
        }

        return redirect()->back()->with('success', 'Mahsulot muvaffaqiyatli qo‘shildi!');
    }

    public function update(Request $request, Product $product)
    {
        // Ichki funksiya
        $uploadImage = function ($request, $key, $default = null) {
            if ($request->hasFile($key)) {
                return $request->file($key)->store('products', 'public');
            }
            return $default;
        };

        $data = $request->validate([
            'product_name' => 'required|string',
            'brend' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'photo1' => 'nullable|image',
            'photo2' => 'nullable|image',
            'photo3' => 'nullable|image',
            'photo_url1' => 'nullable|string',
            'photo_url2' => 'nullable|string',
            'photo_url3' => 'nullable|string',
            'variants' => 'required|json',
        ]);

        $product->update([
            'product_name' => $data['product_name'],
            'brend' => $data['brend'],
            'category_id' => $data['category_id'],
            'photo1' => $uploadImage($request, 'photo1', $data['photo_url1']),
            'photo2' => $uploadImage($request, 'photo2', $data['photo_url2']),
            'photo3' => $uploadImage($request, 'photo3', $data['photo_url3']),
        ]);

        $product->variants()->delete();

        foreach (json_decode($data['variants'], true) as $variant) {
            $product->variants()->create([
                'sizes' => $variant['sizes'],
                'colors' => $variant['colors'],
                'price' => $variant['price'],
            ]);
        }

        return response()->json(['message' => 'Mahsulot yangilandi ✅']);
    }

    public function index(Request $request)
    {
        $search = $request->input('search');

        $products = Product::with('category', 'variants')
            ->when($search, function ($query, $search) {
                $query->where('product_name', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate(5);

        return Inertia::render('admin/productStock', [
            'products' => $products,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function edit($id)
    {
        $product = Product::with(['category', 'variants'])->findOrFail($id);
        $categories = Category::all();

        return Inertia::render('admin/editProducts', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function deleteProduct(Product $product)
    {
        // Rasmlarni o‘chirish
        foreach (['photo1', 'photo2', 'photo3'] as $photoKey) {
            $filePath = $product->$photoKey;

            if (!empty($filePath)) {
                // "storage/products/example.jpg" => "products/example.jpg"
                $cleanPath = str_replace('storage/', '', $filePath);

                if (\Storage::disk('public')->exists($cleanPath)) {
                    \Storage::disk('public')->delete($cleanPath);
                }
            }
        }

        // Bog‘liq variantlarni o‘chirish
        $product->variants()->delete();

        // Mahsulotni o‘chirish
        $product->delete();

        return response()->json(['message' => 'Mahsulot va rasmlar o‘chirildi'], 200);
    }

    public function deletePhoto($id, $key)
    {
        $product = Product::findOrFail($id);

        // Masalan, $key = 'photo1', 'photo2', yoki 'photo3'
        $photoPath = $product->$key;

        if ($photoPath && Storage::exists($photoPath)) {
            Storage::delete($photoPath);
        }

        // Bazadagi photo fieldni null qilamiz
        $product->$key = null;
        $product->save();

        return response()->json(['message' => 'Photo deleted']);
    }
}

<?php

// app/Http/Controllers/FavoriteController.php
namespace App\Http\Controllers;

use App\Models\Product;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $products  = Product::with(['category', 'variants'])->latest()->get();
        $favorites = Auth::user()->favorites;
        return inertia('Favorite', [
            'favorites' => $favorites,
            'products'  => $products,
        ]);
    }
    public function store(Request $request)
    {
        $user      = $request->user();
        $productId = $request->input('product_id');

        $user->favorites()->syncWithoutDetaching([$productId]);

        return response()->json(['status' => 'ok']);
    }

    public function destroy(Request $request, Product $product)
    {
        $user = $request->user();
        $user->favorites()->detach($product->id);

        return response()->json(['message' => 'Sevimlilardan o‘chirildi']);
    }
}

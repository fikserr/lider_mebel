<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'size' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'price' => 'nullable|integer|min:1',
        ]);

        $cart = Cart::create([
            'user_id' => auth()->id(),
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'size' => $data['size'] ?? null,
            'color' => $data['color'] ?? null,
            'price' => $data['price'] ?? 0,
        ]);

        \Log::info('Cart item added:', $cart->toArray());

        return back()->with('success', 'Mahsulot savatga qo‘shildi!');
    }

    public function showCart()
    {
        $cartItems = Cart::with(['product'])
            ->where('user_id', Auth::id())
            ->get();

        $address = Auth::user()?->address()->get();

        return Inertia::render('basket', [
            'cartItems' => $cartItems,
            'address' => $address,
        ]);
    }

    public function removeFromCart($id)
    {
        Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->delete();

        return back()->with('success', 'Mahsulot savatdan olib tashlandi');
    }
}

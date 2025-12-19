<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function userOrders()
    {
        $user = Auth::user();

        $orders = Order::with(['items.product', 'address'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('HistoryOrders', [
            'orders' => $orders,
        ]);
    }

    // OrderController.php
    public function adminOrders()
    {
        $orders = Order::with(['user', 'items.product', 'address'])
            ->latest()
            ->get();

        return Inertia::render('admin/orderLists', [
            'orders' => $orders,
        ]);
    }
    public function placeOrder(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'address_id' => 'required|exists:addresses,id',
        ]);

        // Savatni product bilan olish
        $cartItems = Cart::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Savat bo‘sh!');
        }

        // Umumiy narxni hisoblash — narx to‘g‘ridan-to‘g‘ri cart jadvalidan olinadi
        $totalPrice = $cartItems->reduce(function ($total, $item) {
            return $total + ($item->price * $item->quantity);
        }, 0);

        // Buyurtma yaratish
        $order = Order::create([
            'user_id'     => $user->id,
            'address_id'  => $request->address_id,
            'status'      => 'pending',
            'total_price' => $totalPrice,
        ]);

        // Savatdagi mahsulotlarni order_items jadvaliga yozish
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $item->product_id,
                'quantity'   => $item->quantity,
                'size'       => $item->size,
                'color'      => $item->color,
                'price'      => $item->price, // to‘g‘ridan-to‘g‘ri cart narxidan
            ]);
        }

        // Savatni tozalash
        Cart::where('user_id', $user->id)->delete();

        return redirect()->route('order.success')
            ->with('success', 'Buyurtma yuborildi!');
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,success,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json(['message' => 'Holat yangilandi'], 200);
    }

    // Buyurtma muvaffaqiyatli tugadi sahifasi
    public function success()
    {
        return inertia('order-success'); // yoki redirect to some page
    }
    public function show($id)
    {
        $order = Order::with(['user', 'items.product', 'address'])->findOrFail($id);

        return Inertia::render('admin/orderTableBig', [
            'order' => $order,
        ]);
    }
    public function showPos($id)
    {
        $order = Order::with(['user', 'items.product', 'address'])->findOrFail($id);

        return Inertia::render('admin/orderTable', [
            'order' => $order,
        ]);
    }
}

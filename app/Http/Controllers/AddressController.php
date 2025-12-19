<?php
namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
    /**
     * Foydalanuvchining manzilini olish
     */

    public function show()
    {
        $address = Auth::user()?->address()->get(); // <-- get() ishlatilmoqda

        return Inertia::render('Address', [
            'address' => $address,
        ]);
    }

    /**
     * Manzilni saqlash yoki yangilash
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'   => 'required|string|max:255',
            'last_name'    => 'required|string|max:255',
            'street'       => 'required|string|max:255',
            'city'         => 'required|string|max:255',
            'house_number' => 'required|string|max:255',
            'region'       => 'required|string|max:255',
            'phone'        => 'required|string|max:20',
        ]);

        $user = Auth::user();

        if (! $user) {
            return response()->json(['message' => 'Foydalanuvchi topilmadi.'], 401);
        }

        // Faqat yangi address yaratamiz — update emas
        $user->address()->create($validated);

        return redirect()->route('address.show')->with('message', 'Manzil muvaffaqiyatli qo‘shildi!');
    }

    public function update(Request $request, Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            abort(403, 'Bu manzil sizga tegishli emas.');
        }

        $data = $request->validate([
            'first_name'   => 'required',
            'last_name'    => 'required',
            'street'       => 'required',
            'city'         => 'required',
            'house_number' => 'required',
            'region'       => 'required',
            'phone'        => 'required',
        ]);

        $address->update($data);

        return redirect()->route('address.show')->with('message', 'Manzil yangilandi!');
    }
    public function edit($id)
    {
        $address = Address::findOrFail($id);

        if ($address->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('EditAddress', [
            'address' => $address,
        ]);
    }
    public function destroy($id)
    {
        $address = Address::findOrFail($id);

        if ($address->user_id !== Auth::id()) {
            abort(403, 'Bu manzil sizga tegishli emas.');
        }

        $address->delete();

        return redirect()->route('address.show')->with('message', 'Manzil o‘chirildi!');
    }
}

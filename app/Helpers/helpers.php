<?php

use Illuminate\Http\Request;

function uploadImage(Request $request, $key, $default = null)
{
    if ($request->hasFile($key)) {
        return $request->file($key)->store('products', 'public');
    }
    return $default;
}

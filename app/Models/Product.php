<?php

// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'category_id', // ⬅️ bu muhim
        'colors',
        'brend',
        'photo1',
        'photo2',
        'photo3',
    ];
    protected $casts = [
        'variants' => 'array',
    ];
    public function getPhotoUrl1Attribute()
    {
        return $this->photo1 ? Storage::url($this->photo1) : null;
    }

    public function getPhotoUrl2Attribute()
    {
        return $this->photo2 ? Storage::url($this->photo2) : null;
    }

    public function getPhotoUrl3Attribute()
    {
        return $this->photo3 ? Storage::url($this->photo3) : null;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
    
}

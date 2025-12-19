<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = ['product_id', 'sizes', 'colors', 'price'];
    
    protected $casts    = [
        'sizes'  => 'array',
        'colors' => 'array',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}

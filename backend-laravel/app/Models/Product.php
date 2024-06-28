<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';
    protected $guarded = [];

    public function getStatusAttribute($status)
    {
        switch ($status) {
            case '0':
                $status = 'غیر فعال';
                break;
            case '1':
                $status = 'فعال';
                break;
        }
        return $status;
    }

    protected function isSale(): Attribute
    {
        return Attribute::make(
            get: fn () => ($this->quantity > 0 && $this->sale_price != 0 && $this->sale_price != null && $this->date_on_sale_from < Carbon::now() && $this->date_on_sale_to > Carbon::now()) ? true : false,
            set: fn () => ($this->quantity > 0 && $this->sale_price != 0 && $this->sale_price != null && $this->date_on_sale_from < Carbon::now() && $this->date_on_sale_to > Carbon::now()) ? true : false,
        );
    }

    public function scopeFilter($query)
    {
        if (request()->has('category')) {
            $query->where('category_id', request()->category);
        }

        if (request()->has('sortBy')) {
            $sortBy = request()->sortBy;

            switch ($sortBy) {
                case 'max':
                    $query->where('quantity', '>', 0)->orderBy('price', 'desc');
                    break;
                case 'min':
                    $query->where('quantity', '>', 0)->orderBy('price');
                    break;
                case 'bestseller':
                    $orders = Order::where('payment_status', 1)->get();

                    $orderItems = collect([]);
                    foreach ($orders as $order) {
                        foreach ($order->orderItems as $orderItem) {
                            $orderItems->push($orderItem->toArray());
                        }
                    }

                    $productsId = $orderItems->countBy(function ($item) {
                        return $item['product_id'];
                    })->sortDesc()->keys()->toArray();

                    $rawOrder = DB::raw(sprintf('FIELD(id, %s)', implode(',', $productsId)));

                    $query->whereIn('id', $productsId)->orderByRaw($rawOrder);
                    break;
                case 'sale':
                    $query->where('quantity', '>', 0)->where('sale_price', '!=', 0)->where('date_on_sale_from', '<', Carbon::now())->where('date_on_sale_to', '>', Carbon::now());
                    break;
                default:
                    $query;
                    break;
            }
        }

        return $query;
    }

    public function scopeSearch($query)
    {
        $keyword = request()->search;
        if (request()->has('search') && trim($keyword) != '') {
            $query->where('name', 'LIKE', '%' . trim($keyword) . '%');
        }

        return $query;
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}

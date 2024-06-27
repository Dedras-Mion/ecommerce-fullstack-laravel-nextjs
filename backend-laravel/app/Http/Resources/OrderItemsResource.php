<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_primary_image' => url(env('PRODUCT_IMAGES_UPLOAD_PATH') . Product::find($this->product_id)->primary_image),
            'product_name' => Product::find($this->product_id)->name,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'subtotal' => $this->subtotal
        ];
    }
}

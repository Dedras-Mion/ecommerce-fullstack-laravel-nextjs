<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Http\Resources\ProductImageResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => Category::find($this->category_id)->name,
            'category_id' => $this->category_id,
            'primary_image' => url(env('PRODUCT_IMAGES_UPLOAD_PATH') . $this->primary_image),
            'status_value' => $this->getRawOriginal('status'),
            'status' => $this->status,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'description' => $this->description,
            'is_sale' => $this->is_sale,
            'sale_price' => $this->sale_price,
            'date_on_sale_from' => verta($this->date_on_sale_from)->formatDatetime(),
            'date_on_sale_from_gregorian' => $this->date_on_sale_from,
            'date_on_sale_to' => verta($this->date_on_sale_to)->formatDatetime(),
            'date_on_sale_to_gregorian' => $this->date_on_sale_to,
            'images' => ProductImageResource::collection($this->whenLoaded('images'))
        ];
    }
}

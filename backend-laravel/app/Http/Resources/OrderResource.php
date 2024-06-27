<?php

namespace App\Http\Resources;

use App\Models\UserAddress;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'address_title' => UserAddress::find($this->address_id)->title,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'paying_amount' => $this->paying_amount,
            'created_at' => verta($this->created_at)->format('%B %d، %Y'),
            'order_items' => OrderItemsResource::collection($this->whenLoaded('orderItems'))
        ];
    }
}

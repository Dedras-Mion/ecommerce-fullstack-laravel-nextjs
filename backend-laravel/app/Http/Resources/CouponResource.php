<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
            'code' => $this->code,
            'percentage' => $this->percentage,
            'expired_at' => verta($this->expired_at)->formatDatetime(),
            'expired_at_gregorian' => $this->expired_at,
            'created_at' => verta($this->created_at)->formatDatetime(),
        ];
    }
}

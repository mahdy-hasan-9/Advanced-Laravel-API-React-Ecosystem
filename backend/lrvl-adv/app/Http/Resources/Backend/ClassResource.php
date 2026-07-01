<?php

namespace App\Http\Resources\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'value' => $this->id,
            'label' => $this->name,
        ];
    }
}

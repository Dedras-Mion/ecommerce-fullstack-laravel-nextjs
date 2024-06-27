<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\User;
use App\Models\Province;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use App\Http\Controllers\ApiController;
use App\Http\Resources\OrderResource;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Validator;

class ProfileController extends ApiController
{
    public function info()
    {
        $user = User::find(Auth()->id());
        return $this->successResponse(new UserResource($user), 200);
    }

    public function editInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        Auth()->user()->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        DB::commit();

        return $this->successResponse(new UserResource(Auth()->user()), 200);
    }

    public function addresses()
    {
        $user = User::find(Auth()->id());

        return $this->successResponse([
            'addresses' => $user->addresses,
            'provinces' => Province::all(),
            'cities' => City::all()
        ], 200);
    }

    public function createAddress(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'cellphone' => ['required', 'regex:/^(\+98|0)?9\d{9}$/'],
            'postal_code' => ['required', 'regex:/^\d{5}[ -]?\d{5}$/'],
            'province_id' => 'required|integer',
            'city_id' => 'required|integer',
            'address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        $address = UserAddress::create([
            'user_id' => Auth()->id(),
            'title' => $request->title,
            'cellphone' => $request->cellphone,
            'postal_code' => $request->postal_code,
            'province_id' => $request->province_id,
            'city_id' => $request->city_id,
            'address' => $request->address,
        ]);

        DB::commit();

        return $this->successResponse($address, 200);
    }

    public function editAddress(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address_id' => 'required|integer|exists:user_addresses,id',
            'title' => 'required|string',
            'cellphone' => ['required', 'regex:/^(\+98|0)?9\d{9}$/'],
            'postal_code' => ['required', 'regex:/^\d{5}[ -]?\d{5}$/'],
            'province_id' => 'required|integer',
            'city_id' => 'required|integer',
            'address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        $address = UserAddress::find($request->address_id);

        $address->update([
            'title' => $request->title,
            'cellphone' => $request->cellphone,
            'postal_code' => $request->postal_code,
            'province_id' => $request->province_id,
            'city_id' => $request->city_id,
            'address' => $request->address,
        ]);

        DB::commit();

        return $this->successResponse($address, 200);
    }

    public function deleteAddress(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address_id' => 'required|integer|exists:user_addresses,id|unique:orders,address_id'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        $address = UserAddress::find($request->address_id);

        $address->delete();

        DB::commit();

        return $this->successResponse($address, 200);
    }

    public function orders()
    {
        $user = User::find(Auth()->id());
        $orders = $user->orders()->orderBy('created_at', 'desc')->paginate(8);

        return $this->successResponse([
            'orders' => OrderResource::collection($orders->load('orderItems')),
            'links' => OrderResource::collection($orders)->response()->getData()->links,
            'meta' => OrderResource::collection($orders)->response()->getData()->meta,
        ], 200);
    }

    public function transactions()
    {
        $user = User::find(Auth()->id());
        $transactions = $user->transactions()->orderBy('created_at', 'desc')->paginate(8);

        return $this->successResponse([
            'transactions' => TransactionResource::collection($transactions),
            'links' => TransactionResource::collection($transactions)->response()->getData()->links,
            'meta' => TransactionResource::collection($transactions)->response()->getData()->meta,
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItems;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\OrderResource;
use App\Http\Controllers\ApiController;

class OrderController extends ApiController
{
    public function index()
    {
        $orders = Order::paginate(10);

        return $this->successResponse([
            'orders' => OrderResource::collection($orders->load('orderItems')),
            'links' => OrderResource::collection($orders)->response()->getData()->links,
            'meta' => OrderResource::collection($orders)->response()->getData()->meta,
        ]);
    }

    public static function create($request, $coupon, $amounts, $token)
    {
        DB::beginTransaction();

        $order = Order::create([
            'user_id' => Auth()->id(),
            'address_id' => $request->address_id,
            'total_amount' => $amounts['totalAmount'],
            'coupon_amount' => $amounts['couponAmount'],
            'paying_amount' => $amounts['payingAmount'],
            'coupon_id' => $coupon == null ? null : $coupon->id
        ]);

        foreach ($request->cart as $OrderItems) {
            $product = Product::findOrFail($OrderItems['id']);
            OrderItems::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'price' => $product->is_sale ? $product->sale_price : $product->price,
                'quantity' => $OrderItems['qty'],
                'subtotal' => ($product->price * $OrderItems['qty'])
            ]);
        }

        Transaction::create([
            'user_id' => Auth()->id(),
            'order_id' => $order->id,
            'amount' => $amounts['payingAmount'],
            'token' => $token
        ]);

        DB::commit();
    }

    public static function update($token, $transId)
    {
        DB::beginTransaction();

        $transaction = Transaction::where('token', $token)->firstOrFail();

        $transaction->update([
            'status' => 1,
            'trans_id' => $transId
        ]);

        $order = Order::findOrFail($transaction->order_id);

        $order->update([
            'status' => 1,
            'payment_status' => 1
        ]);

        foreach (OrderItems::where('order_id', $order->id)->get() as $item) {
            $product = Product::find($item->product_id);
            $product->update([
                'quantity' => ($product->quantity -  $item->quantity)
            ]);
        }

        DB::commit();
    }
}

<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Validator;

class PaymentController extends ApiController
{
    // add to .env file

    // ZIBAL_IR_API_KEY=zibal
    // ZIBAL_IR_CALLBACK_URL=http://localhost:3000/payment/verify
    // # ZIBAL_IR_CALLBACK_URL=https://webprog-projects-js.ir/payment/verify

    public function send(Request $request)
    {
        // return $request;
        $validator = Validator::make($request->all(), [
            'cart' => 'required',
            'cart.*.id' => 'required|integer',
            'cart.*.qty' => 'required|integer',
            'address_id' => 'required|integer|exists:user_addresses,id',
            'coupon' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $totalAmount = 0;
        foreach ($request->cart as $orderItem) {
            $product = Product::findOrFail($orderItem['id']);
            if ($product->quantity < $orderItem['qty']) {
                return $this->errorResponse(['error' => ['تعداد محصول وارد شده اشتباه است']], 422);
            }

            $totalAmount += $product->is_sale ? $product->sale_price * $orderItem['qty'] : $product->price * $orderItem['qty'];
        }

        $couponAmount = 0;
        $coupon = null;

        if ($request->coupon) {
            $coupon = Coupon::where('code', $request->coupon)->where('expired_at', '>', Carbon::now())->first();

            if ($coupon == null) {
                return $this->errorResponse(['error' => ['کد تخفیف وارد شده وجود ندارد']], 422);
            }

            if (Order::where('user_id', Auth()->id())->where('coupon_id', $coupon->id)->where('payment_status', 1)->exists()) {
                return $this->errorResponse(['error' => ['شما قبلا از این کد تخفیف استفاده کرده اید']], 422);
            }

            $couponAmount = ($totalAmount * $coupon->percentage) / 100;
        }

        $payingAmount = $totalAmount - $couponAmount;

        $amounts = [
            'totalAmount' => $totalAmount,
            'couponAmount' => $couponAmount,
            'payingAmount' => $payingAmount,
        ];

        // return $amounts;

        $merchant = env('ZIBAL_IR_API_KEY');
        $amount = $payingAmount . '0';
        $mobile = "شماره موبایل";
        $description = "توضیحات";
        $callbackUrl = env('ZIBAL_IR_CALLBACK_URL');
        $result = $this->sendRequest($merchant, $amount, $callbackUrl, $mobile, $description);
        $result = json_decode($result);

        if ($result->result == 100) {
            OrderController::create($request, $coupon, $amounts, $result->trackId);
            $go = "https://gateway.zibal.ir/start/$result->trackId";
            return $this->successResponse([
                'url' => $go
            ]);
        } else {
            return $this->errorResponse(['error' => ['تراکنش با خطا مواجه شد']], 422);
        }
    }

    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'status' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $merchant = env('ZIBAL_IR_API_KEY');
        $trackId = $request->token;
        $result = json_decode($this->verifyRequest($merchant, $trackId));

        if ($result->result == 100) {
            OrderController::update($trackId, $result->refNumber);
            return $this->successResponse([
                'status' => true,
                'transId' => $result->refNumber
            ], 200);
        } else if ($result->result == 201) {
            return $this->successResponse([
                'status' => false,
                'error' => 'این تراکنش قبلا توی سیستم ثبت شده است'
            ], 200);
        } else if ($result->result == 202) {
            return $this->successResponse([
                'status' => false,
                'error' => 'تراکنش شما ناموفق بود'
            ], 200);
        } else {
            return $this->errorResponse(['error' => ['تراکنش با خطا مواجه شد']], 422);
        }
    }

    public function sendRequest($merchant, $amount, $callbackUrl, $mobile = null, $description = null)
    {
        return $this->curl_post('https://gateway.zibal.ir/v1/request', [
            'merchant'     => $merchant,
            'amount'       => $amount,
            'callbackUrl'  => $callbackUrl,
            'mobile'       => $mobile,
            'description'  => $description,
        ]);
    }

    function verifyRequest($merchant, $trackId)
    {
        return $this->curl_post('https://gateway.zibal.ir/v1/verify', [
            'merchant' => $merchant,
            'trackId'  => $trackId,
        ]);
    }

    public function curl_post($url, $params)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
        ]);
        $res = curl_exec($ch);
        curl_close($ch);

        return $res;
    }
}

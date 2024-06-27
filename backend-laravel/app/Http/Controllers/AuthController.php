<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\OTPSms;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cellphone' => ['required', 'regex:/^(\+98|0)?9\d{9}$/']
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $user = User::where('cellphone', $request->cellphone)->first();
        $OTPCode = mt_rand(100000, 999999);
        $loginToken = Hash::make('DCDCojncd@cdjn%!!ghnjrgtn&&');

        if ($user) {
            $user->update([
                'otp' => $OTPCode,
                'login_token' => $loginToken
            ]);
        } else {
            $user = User::Create([
                'cellphone' => $request->cellphone,
                'otp' => $OTPCode,
                'login_token' => $loginToken
            ]);
        }
        $user->notify(new OTPSms($OTPCode));

        return $this->successResponse(['login_token' => $loginToken], 200);
    }

    public function checkOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|digits:6',
            'login_token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $user = User::where('login_token', $request->login_token)->firstOrFail();

        if ($user->otp == $request->otp) {
            $token = $user->createToken('myApp', ['user'])->plainTextToken;

            return $this->successResponse([
                'user' => new UserResource($user),
                'token' => $token
            ], 200);
        } else {
            return $this->errorResponse(['otp' => ['کد ورود نادرست است']], 422);
        }
    }

    public function resendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'login_token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $user = User::where('login_token', $request->login_token)->firstOrFail();
        $OTPCode = mt_rand(100000, 999999);
        $loginToken = Hash::make('DCDCojncd@cdjn%!!ghnjrgtn&&');

        $user->update([
            'otp' => $OTPCode,
            'login_token' => $loginToken
        ]);

        $user->notify(new OTPSms($OTPCode));

        return $this->successResponse(['login_token' => $loginToken], 200);
    }

    public function me()
    {
        $user = User::find(Auth::id());
        return $this->successResponse(new UserResource($user), 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->successResponse(['data' => ['logged out']], 200);
    }
    ///////////////// admin panel //////////
    public function meAdmin()
    {
        $user = User::find(Auth::id());
        return $this->successResponse(new UserResource($user), 200);
    }

    public function loginAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->errorResponse(['user' => ['کاربر مورد نظر پیدا نشد']], 422);
        }

        if ($user->is_admin == 0) {
            return $this->errorResponse(['user' => ['کاربر مورد نظر پیدا نشد']], 422);
        }

        if (!Hash::check($request->password, $user->password)) {
            return $this->errorResponse(['password' => ['پسورد اشتباه است']], 422);
        }

        $token = $user->createToken('myApp', ['admin'])->plainTextToken;

        return $this->successResponse([
            'user' => new UserResource($user),
            'token' => $token
        ], 200);
    }

    public function logoutAdmin()
    {
        auth()->user()->tokens()->delete();

        return $this->successResponse(['data' => ['logged out']], 200);
    }
}

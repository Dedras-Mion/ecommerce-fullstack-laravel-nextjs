<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/check-otp', [AuthController::class, 'checkOtp']);
Route::post('/auth/resend-otp', [AuthController::class, 'resendOtp']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/me', [AuthController::class, 'me']);

    Route::get('/user/addresses', [UserController::class, 'addresses']);
    Route::post('/check-coupon', [CouponController::class, 'check']);
    Route::post('/payment/send', [PaymentController::class, 'send']);

    Route::prefix('profile')->group(function () {
        Route::get('/info', [ProfileController::class, 'info']);
        Route::post('/info/edit', [ProfileController::class, 'editInfo']);

        Route::get('/addresses', [ProfileController::class, 'addresses']);
        Route::post('/addresses/create', [ProfileController::class, 'createAddress']);
        Route::post('/addresses/edit', [ProfileController::class, 'editAddress']);
        Route::post('/addresses/delete', [ProfileController::class, 'deleteAddress']);

        Route::get('/orders', [ProfileController::class, 'orders']);
        Route::get('/transactions', [ProfileController::class, 'transactions']);
    });
});
Route::post('/payment/verify', [PaymentController::class, 'verify']);


Route::get('/products/products-tabs', [ProductController::class, 'productsTabs']);
Route::get('/products/{product:slug}', [ProductController::class, 'show']);
Route::get('/random-products', [ProductController::class, 'randomProduct']);

Route::get('/menu', [ProductController::class, 'menu']);

Route::get('/categories', [CategoryController::class, 'list']);

Route::post('/contact-us', [ContactUsController::class, 'store']);


//////////////////////// Admin Paanel ////////////////////////
Route::prefix('admin-panel')->middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::get('/categories/{category}/children', [CategoryController::class, 'children']);
    Route::get('/categories/{category}/parent', [CategoryController::class, 'parent']);
    Route::get('/categories/{category}/products', [CategoryController::class, 'products']);
    Route::get('/categories-list', [CategoryController::class, 'listAdmin']);

    Route::apiResource('products', ProductController::class);

    Route::get('/transactions/chart', [TransactionController::class, 'chart']);
    Route::get('/transactions', [TransactionController::class, 'index']);

    Route::apiResource('users', UserController::class);

    Route::apiResource('coupons', CouponController::class);

    Route::apiResource('orders', OrderController::class);

    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/me', [AuthController::class, 'meAdmin']);
    Route::post('/auth/logout', [AuthController::class, 'logoutAdmin']);
});

Route::post('/admin-panel/auth/login', [AuthController::class, 'loginAdmin']);

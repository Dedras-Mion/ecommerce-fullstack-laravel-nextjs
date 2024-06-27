<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Validator;

class ProductController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate(5);

        return $this->successResponse([
            'products' => ProductResource::collection($products->load('images')),
            'links' => ProductResource::collection($products)->response()->getData()->links,
            'meta' => ProductResource::collection($products)->response()->getData()->meta,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'category_id' => 'required|integer',
            'primary_image' => 'required|image',
            'description' => 'required',
            'price' => 'required|integer',
            'status' => 'required|integer',
            'quantity' => 'required|integer',
            'sale_price' => 'nullable|integer',
            'date_on_sale_from' => 'nullable|date_format:Y-m-d H:i:s',
            'date_on_sale_to' => 'nullable|date_format:Y-m-d H:i:s',
            'images.*' => 'nullable|image'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }
        // return 'ok';
        DB::beginTransaction();

        $primaryImageName = Carbon::now()->microsecond . '.' . $request->primary_image->extension();
        $request->primary_image->storeAs('images/products', $primaryImageName, 'public');

        if ($request->has('images') && $request->images !== null) {
            $fileNameImages = [];
            foreach ($request->images as $image) {
                $fileNameImage = Carbon::now()->microsecond . '.' . $image->extension();
                $image->storeAs('images/products', $fileNameImage, 'public');
                array_push($fileNameImages, $fileNameImage);
            }
        }

        $product = Product::create([
            'name' => $request->name,
            'slug' => $this->makeSlug($request->name),
            'category_id' => $request->category_id,
            'primary_image' => $primaryImageName,
            'description' => $request->description,
            'status' => $request->status,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'sale_price' => $request->sale_price !== null ? $request->sale_price : 0,
            'date_on_sale_from' => $request->date_on_sale_from,
            'date_on_sale_to' => $request->date_on_sale_to,
        ]);

        if ($request->has('images') && $request->images !== null) {
            foreach ($fileNameImages as $fileNameImage) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $fileNameImage
                ]);
            }
        }

        DB::commit();

        return $this->successResponse(new ProductResource($product), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $this->successResponse(new ProductResource($product->load('images')));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'category_id' => 'required|integer',
            'primary_image' => 'nullable|image',
            'description' => 'required',
            'price' => 'required|integer',
            'status' => 'required|integer',
            'quantity' => 'required|integer',
            'sale_price' => 'nullable|integer',
            'date_on_sale_from' => 'nullable|date_format:Y-m-d H:i:s',
            'date_on_sale_to' => 'nullable|date_format:Y-m-d H:i:s',
            'images.*' => 'nullable|image'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        if ($request->has('primary_image') && $request->primary_image !== null) {
            $primaryImageName = Carbon::now()->microsecond . '.' . $request->primary_image->extension();
            $request->primary_image->storeAs('images/products', $primaryImageName, 'public');
        }

        if ($request->has('images') && $request->images !== null) {
            $fileNameImages = [];
            foreach ($request->images as $image) {
                $fileNameImage = Carbon::now()->microsecond . '.' . $image->extension();
                $image->storeAs('images/products', $fileNameImage, 'public');
                array_push($fileNameImages, $fileNameImage);
            }
        }

        $product->update([
            'name' => $request->name,
            'slug' => $request->name != $product->name ? $this->makeSlug($request->name) : $product->slug,
            'category_id' => $request->category_id,
            'primary_image' => $request->primary_image !== null ? $primaryImageName : $product->primary_image,
            'description' => $request->description,
            'status' => $request->status,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'sale_price' => $request->sale_price,
            'date_on_sale_from' => $request->date_on_sale_from !== null ? $request->date_on_sale_from : $product->date_on_sale_from,
            'date_on_sale_to' => $request->date_on_sale_to !== null ? $request->date_on_sale_to : $product->date_on_sale_to
        ]);

        if ($request->has('images') && $request->images !== null) {
            foreach ($product->images as $productImage) {
                $productImage->delete();
            }
            foreach ($fileNameImages as $fileNameImage) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $fileNameImage
                ]);
            }
        }

        DB::commit();

        return $this->successResponse(new ProductResource($product), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        DB::beginTransaction();
        $product->delete();
        DB::commit();

        return $this->successResponse(new ProductResource($product), 200);
    }

    public function productsTabs()
    {
        $categories = Category::all();
        $tabPanel = [];
        foreach ($categories as $category) {
            array_push($tabPanel, ProductResource::collection($category->products->take(9)->load('images')));
        }

        return $this->successResponse([
            'tabList' => $categories->pluck('name'),
            'tabPanel' => $tabPanel
        ], 200);
    }

    public function randomProduct(Request $request)
    {
        if ($request->has('count')) {
            return $this->successResponse(ProductResource::collection(Product::all()->random($request->count)->load('images')), 200);
        } else {
            return $this->errorResponse('The path requires a count parameter', 500);
        }
    }

    public function menu()
    {
        $products = Product::filter()->search()->paginate(6);

        return $this->successResponse([
            'products' => ProductResource::collection($products->load('images')),
            'links' => ProductResource::collection($products)->response()->getData()->links,
            'meta' => ProductResource::collection($products)->response()->getData()->meta,
        ], 200);
    }

    public function makeSlug($string)
    {
        $slug = slugify($string);
        $count = Product::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();
        $result = $count ? "{$slug}-{$count}" : $slug;

        return $result;
    }
}

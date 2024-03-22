import React from 'react';

import {Heart} from 'lucide-react';

import {getFetch} from '@/src/utils/fetch';
import Rating from '@/src/components/products/Rating';
import ProductItem from '@/src/components/products/ProductItem';
import CustomButton from '@/src/components/button/button/Button';
import ProductSlider from '@/src/components/layout/carousel/ProductSlider';
import {numberFormat, salePercent} from '@/src/utils/helpers';

export default async function singleProductPage({params}) {
  const product = await getFetch(`/products/${decodeURI(params.slug)}`);
  // console.log(decodeURI(params.slug));
  // ex url : /products/پیتزا-رست-بیف
  // console.log(product); pass

  const randomProduct = await getFetch('/random-products?count=4');
  // console.log(randomProduct);

  const allImages = [product.primary_image, ...product.images.map((img) => img.image)];

  return (
    <div>
      <section className='body-font overflow-hidden bg-gray-900 text-gray-400'>
        <div className='container mx-auto px-5 py-24'>
          <div className='mx-auto flex flex-wrap lg:w-4/5'>
            <ProductSlider images={allImages} />

            <div className='mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10'>
              <h2 className='title-font text-sm tracking-widest text-gray-500'>{product.category}</h2>
              <h1 className='title-font mb-1 text-3xl font-medium text-white'>{product.name}</h1>
              <Rating />
              <p className='leading-relaxed'>{product.description}</p>
              <div className='mb-5 mt-6 flex items-center border-b-2 border-gray-800 pb-5'></div>
              <div className='flex'>
                <div className='flex items-center justify-center gap-4'>
                  <span>
                    {product.is_sale ? (
                      <>
                        <del className='text-xs'>{numberFormat(product.price)}$</del>
                        <p className='mt-1 text-xs text-red-700'>{numberFormat(product.sale_price)}$</p>
                      </>
                    ) : (
                      <>
                        <p className='text-xs'>{numberFormat(product.price)}$</p>
                      </>
                    )}
                  </span>

                  <span>
                    {product.is_sale && <span>{salePercent(product.price, product.sale_price)}٪ Discount</span>}
                  </span>

                  <CustomButton href={`/product/${product.slug}`} text='buy' />
                  <button className='ml-4 mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-800 p-0 text-gray-500'>
                    <Heart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='mb-5 mt-6 flex items-center border-b-2 border-gray-800 pb-5'></div>
      <section className='m-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {randomProduct.map((product, index) => (
          <div key={index} className={`block ${index >= 2 ? 'hidden lg:block' : ''}`}>
            <ProductItem product={product} />
          </div>
        ))}
      </section>
    </div>
  );
}

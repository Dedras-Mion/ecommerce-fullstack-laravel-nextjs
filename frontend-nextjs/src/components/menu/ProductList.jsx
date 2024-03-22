import React from 'react';
import ProductItem from '../products/ProductItem';
import Paginate from './Paginate';
import {getFetch} from '@/src/utils/fetch';

export default async function ProductList({params}) {
  const data = await getFetch(`/menu?${params}`);

  return (
    <>
      <div className='flex flex-col'>
        <div className='m-8 mx-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.products.map((product) => (
            <div key={product.id} className=''>
              <ProductItem product={product} />
            </div>
          ))}
        </div>

        <div className='m-4 flex items-center justify-center'>
          <Paginate links={data.meta.links} />
        </div>
      </div>
    </>
  );
}

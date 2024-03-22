import {Suspense} from 'react';

import {getFetch} from '@/src/utils/fetch';
import Sort from '@/src/components/menu/Sort';
import SearchMenu from '@/src/components/menu/SearchMenu';
import ProductList from '@/src/components/menu/ProductList';
import CategoriesList from '@/src/components/menu/CategoriesList';
import Loading from '@/src/components/UI/loading/Loading';

export default async function MenuPage({searchParams}) {
  const categoriesFetch = await getFetch('/categories');
  const params = new URLSearchParams(searchParams);
  // console.log(searchParams, query parameters or string from the URL );
  // console.log(params.toString());
  // console.log(categoriesFetch);
  return (
    <div className=''>
      <section className='flex'>
        <div className='my-12 ml-8 hidden flex-col gap-8 rounded-3xl bg-black p-4 lg:flex'>
          <SearchMenu />
          <CategoriesList categoriesFetch={categoriesFetch} />

          <Sort />
        </div>
        <div className='mt-4 flex flex-grow items-center justify-center'>
          <Suspense key={params.toString()} fallback={<Loading />}>
            <ProductList params={params.toString()} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

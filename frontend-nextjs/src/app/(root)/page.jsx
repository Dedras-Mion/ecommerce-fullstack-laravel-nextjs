import React from 'react';

import {getFetch} from '@/src/utils/fetch';
import About from '@/src/components/about/About';
import Contact from '@/src/components/contact/Contact';
import ProductTabs from '@/src/components/products/ProductTabs';
import {Carousel} from '@/src/components/layout/carousel/Carousel';

export default async function Page() {
  const productsTabFetch = await getFetch('/products/products-tabs');

  return (
    <div>
      <Carousel />
      <ProductTabs tabList={productsTabFetch.tabList} tabPanel={productsTabFetch.tabPanel} />
      <About />
      <Contact />
    </div>
  );
}

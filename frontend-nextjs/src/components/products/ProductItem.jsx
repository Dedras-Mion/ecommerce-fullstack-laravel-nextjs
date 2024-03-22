import Image from 'next/image';
import Link from 'next/link';
import CustomButton from '../button/button/Button';
import {getBlurDataUrl, numberFormat} from '@/src/utils/helpers';

export default function ProductItem({product}) {
  return (
    <div className='h-82 card relative w-auto bg-black bg-opacity-90 shadow-xl'>
      <figure className='relative h-60 w-full'>
        <Image
          src={product.primary_image}
          alt={product.slug}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='pointer-events-none object-cover'
          placeholder='blur'
          blurDataURL={getBlurDataUrl()}
        />

        <div className='absolute bottom-4 left-1/2 hidden justify-center rounded-2xl bg-slate-500 text-black lg:card-actions'>
          <p className='badge badge-outline badge-sm'>{product.category}</p>
        </div>
      </figure>
      {/* add min-h-[160px] for fix height product cart */}
      <div className='card-body flex min-h-[160px] flex-col justify-between p-2'>
        <Link href={`/products/${product.slug}`}>
          <h2 className='card-title text-sm'>{product.name}</h2>
        </Link>
        <div className='flex items-center space-x-3'>
          <h3 className='text-xs'>{product.description}</h3>

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
        </div>
        {/* Button */}
        <CustomButton href={`/product/${product.slug}`} text='buy' />
      </div>
    </div>
  );
}

'use client';
import {useState} from 'react';
import Image from 'next/image';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {getBlurDataUrl} from '@/src/utils/helpers';

const ProductSlider = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='relative w-full max-w-md'>
      <div className='relative h-80 w-full'>
        {images.map((image, index) => (
          <figure
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={image}
              placeholder='blur'
              blurDataURL={getBlurDataUrl()}
              width={460}
              height={310}
              className='h-full w-full rounded-xl object-cover'
              alt={`product-image-${index}`}
            />
          </figure>
        ))}
      </div>
      <div className='top-2/5 absolute left-5 right-5 flex -translate-y-1/2 transform justify-between'>
        <button onClick={goToPrevious} className='btn btn-circle btn-sm bg-black bg-opacity-50 hover:bg-opacity-90'>
          <ChevronLeft />
        </button>
        <button onClick={goToNext} className='opa btn btn-circle btn-sm bg-black bg-opacity-50 hover:bg-opacity-90'>
          <ChevronRight />
        </button>
      </div>
      <div className='mt-4 flex justify-center'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`mx-1 border p-1 ${currentIndex === index ? 'border-red-500' : 'border-gray-500'} rounded`}>
            <Image
              src={image}
              placeholder='blur'
              blurDataURL={getBlurDataUrl()}
              width={50}
              height={50}
              className='h-12 w-12 rounded object-cover'
              alt={`thumbnail-${index}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;

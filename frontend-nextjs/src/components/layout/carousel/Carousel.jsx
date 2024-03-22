'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Image from 'next/image';

export const Carousel = () => {
  const carouselData = [
    {src: '/images/slider1.jpg', alt: 'Slider Image 1'},
    {src: '/images/slider2.jpg', alt: 'Slider Image 2'},
    {src: '/images/slider3.jpg', alt: 'Slider Image 3'},
  ];

  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setSlide((slide + 1) % carouselData.length);
  }, [slide, carouselData.length]);

  const prevSlide = () => {
    setSlide(slide === 0 ? carouselData.length - 1 : slide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [nextSlide]);

  if (!carouselData || carouselData.length === 0) {
    return null; // Return null or a fallback UI if data is not available
  }

  return (
    <div className='relative w-full overflow-hidden'>
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition duration-300 hover:bg-opacity-75'>
        <ChevronLeft className='h-6 w-6' />
      </button>
      <div className='pointer-events-none relative h-screen'>
        {carouselData.map((item, idx) => (
          <Image
            key={idx}
            src={item.src}
            alt={item.alt}
            fill
            // style={{ objectFit: "cover" }}
            className={`absolute left-0 top-0 object-cover transition-opacity duration-500 ${slide === idx ? 'opacity-100' : 'opacity-0'}`}
            priority={idx === 0} // Add priority for the first image
          />
        ))}
      </div>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition duration-300 hover:bg-opacity-75'>
        <ChevronRight className='h-6 w-6' />
      </button>
      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform flex-col items-center space-x-2'>
        <button className='btn btn-wide m-6 hover:bg-opacity-75'>Learn more...</button>
        <div className='flex space-x-2'>
          {carouselData.map((_, idx) => (
            <button
              key={idx}
              className={`h-3 w-3 rounded-full ${slide === idx ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setSlide(idx)}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

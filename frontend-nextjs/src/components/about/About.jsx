import Image from 'next/image';
import React from 'react';
import aboutImage from '@/public/images/about-img.png';
export default function About() {
  return (
    <div>
      <section className='body-font bg-gray-900 text-gray-400'>
        <div className='container mx-auto flex flex-col items-center px-5 py-24 md:flex-row'>
          <div className='mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg'>
            <Image
              className='pointer-events-none rounded object-cover object-center'
              alt='hero'
              src={aboutImage}
              width={300}
              height='auto'
            />
          </div>
          <div className='flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24'>
            <h1 className='title-font mb-4 text-3xl font-medium text-white sm:text-4xl'>
              Before they sold out
              <br className='hidden lg:inline-block' />
              readymade gluten
            </h1>
            <p className='mb-8 leading-relaxed'>
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard
              tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon
              try-hard chambray.
            </p>
            <div className='flex justify-center space-x-8'>
              <button className='btn btn-neutral'>Reade more</button>
              <button className='btn btn-ghost'>Support</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

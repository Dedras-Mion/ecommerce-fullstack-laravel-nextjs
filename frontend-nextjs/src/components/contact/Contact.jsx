import dynamic from 'next/dynamic';
import FormContact from './FormContact';

export default function Contact() {
  const Map = dynamic(() => import('./Map'), {ssr: false});

  return (
    <div>
      <section className='body-font relative bg-gray-900 text-gray-400'>
        <div className='container mx-auto flex flex-wrap items-center px-5 py-24 sm:flex-nowrap'>
          <div className='h-[400px] w-3/6 overflow-hidden rounded-lg'>
            <Map />
          </div>
          <div className='mt-8 flex w-full flex-col md:ml-auto md:mt-0 md:w-1/2 md:py-8 lg:w-1/3'>
            <FormContact />
          </div>
        </div>
      </section>
    </div>
  );
}

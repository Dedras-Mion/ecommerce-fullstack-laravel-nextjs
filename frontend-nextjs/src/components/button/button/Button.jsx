import Link from 'next/link';
import {ShoppingCart} from 'lucide-react';

const CustomButton = ({href, text, style}) => {
  return (
    <Link
      href={href}
      className={`group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-lg p-2 px-4 py-2 font-medium text-indigo-600 shadow-2xl ${style}`}>
      <span className='ease absolute left-0 top-0 -ml-3 -mt-10 h-32 w-32 rounded-full bg-red-500 blur-md transition-all duration-700' />
      <span className='ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180'>
        <span className='absolute bottom-0 left-0 -ml-10 h-20 w-20 rounded-full bg-purple-500 blur-md' />
        <span className='absolute bottom-0 right-0 -mr-10 h-20 w-20 rounded-full bg-pink-500 blur-md' />
      </span>
      <span className='relative flex space-x-4 text-white'>
        <ShoppingCart />
        <p className='hidden group-hover:flex'>{text}</p>
      </span>
    </Link>
  );
};

export default CustomButton;

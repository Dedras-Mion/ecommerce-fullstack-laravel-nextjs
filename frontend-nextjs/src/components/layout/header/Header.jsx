'use client';
import {useContext} from 'react';

import {Fingerprint, Menu, ShoppingCart, UserRound, Utensils} from 'lucide-react';

import Link from 'next/link';
import {AuthContext} from '@/src/context/AuthContext';

import NavbarList from './NavbarList';

function Header() {
  const {user} = useContext(AuthContext);
  return (
    <header className='isSticky sticky left-0 top-0 z-50 mx-auto w-full bg-black bg-opacity-50 transition-all'>
      <div className='navbar bg-black bg-opacity-50'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-circle btn-ghost lg:hidden'>
              <Menu />
            </div>
            <div className='ml-4'>
              <NavbarList />
            </div>
          </div>
          <Utensils />
        </div>
        <div className='navbar-center hidden lg:flex'>
          <NavbarList />
        </div>
        <div className='navbar-end flex gap-4'>
          <div className='form-control hidden lg:block'>
            <input type='text' placeholder='Search' className='input input-bordered w-24 md:w-auto' />
          </div>
          {user ? (
            <>
              <Link href='/basket' className='btn btn-circle btn-ghost'>
                <ShoppingCart />
              </Link>

              <Link href='/profile' className='btn btn-circle btn-ghost'>
                <UserRound />
              </Link>
            </>
          ) : (
            <Link href='/auth/login' className='btn btn-circle btn-ghost'>
              <Fingerprint />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

'use client';

import {AuthActionLogout} from '@/src/actions/AuthAction';
import {AuthContext} from '@/src/context/AuthContext';
import {LogOut} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useContext} from 'react';

export default function Logout() {
  const {logoutContext} = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await AuthActionLogout();
      logoutContext();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className='flex'>
        <span>
          <LogOut className='hover:text-red-500' />
        </span>
        <span className='ml-4 hidden lg:flex'>Log Out</span>
      </button>
    </div>
  );
}

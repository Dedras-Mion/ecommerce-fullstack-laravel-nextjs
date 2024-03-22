'use client';
import {CircleX, Search} from 'lucide-react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

export default function SearchMenu() {
  const [term, setTerm] = useState('');
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(remove) {
    const params = new URLSearchParams(searchParams);
    params.delete('page');

    if (remove) {
      params.delete('search');
      setTerm('');
    } else {
      params.set('search', term);
    }
    router.replace(`${pathName}?${params.toString()}`);

    // console.log(term);
    // example url: .../menu?search=str
  }

  return (
    <div>
      <label htmlFor='search' className='input input-bordered flex items-center gap-2'>
        {searchParams.has('search') && (
          <span className='hover:text-red-500' onClick={() => handleSearch(true)}>
            <CircleX className='size-4' />
          </span>
        )}
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          type='text'
          id='search'
          name='search'
          className='grow'
          placeholder='Search'
        />
        <button className='hover:text-red-500' onClick={() => term !== '' && handleSearch()}>
          <Search />
        </button>
      </label>
    </div>
  );
}

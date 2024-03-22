'use client';
import {usePathname, useSearchParams, useRouter} from 'next/navigation';
import React from 'react';

export default function PaginateProducts({links}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  function handlePage(page) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.replace(`${pathName}?${params.toString()}`);

    // console.log(page, pathName);
    // console.log(`${pathName}?page=${page}`);
    // console.log(params.toString());
  }

  return (
    <div>
      <div className='join'>
        {links.slice(1, -1).map((link, index) => (
          <span key={index}>
            <button
              className={link.active ? 'btn join-item btn-active btn-sm' : 'btn join-item btn-sm'}
              onClick={() => handlePage(link.label)}>
              {link.label}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

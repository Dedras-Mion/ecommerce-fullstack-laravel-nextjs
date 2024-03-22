'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {motion} from 'framer-motion';

function NavbarList() {
  const pathname = usePathname();
  const links = [
    {href: '/', label: 'Home'},
    {href: '/menu', label: 'Menu'},
    {href: '/about', label: 'About'},
    {href: '/contact', label: 'Contact'},
    {href: '/blog', label: 'Blog'},
  ];

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {y: 0, opacity: 1},
  };

  return (
    <motion.ul
      className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-[#101827] p-2 shadow lg:menu-horizontal lg:w-auto lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none'
      variants={containerVariants}
      initial='hidden'
      animate='visible'>
      {links.map(({href, label}) => (
        <motion.li key={href} className='relative hover:text-red-500' variants={itemVariants}>
          <Link href={href} className={pathname === href ? 'text-red-500' : ''}>
            {label}
            {pathname === href && (
              <motion.div
                layoutId='active'
                className='absolute inset-0 rounded-md bg-red-100 bg-opacity-10'
                initial={false}
                transition={{type: 'spring', stiffness: 380, damping: 30}}
              />
            )}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default NavbarList;

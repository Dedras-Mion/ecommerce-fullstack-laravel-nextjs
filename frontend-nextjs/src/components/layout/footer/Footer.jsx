import Link from 'next/link';

function Footer() {
  return (
    <div>
      <footer className='footer footer-center rounded bg-black p-4 text-base-content'>
        <div className='m-1'>
          <p className='hidden lg:block'>
            Copyright &copy; 2024 - All right reserved by{' '}
            <a
              className='cursor-pointer hover:text-red-500'
              href='https://github.com/Foshati'
              target='_blank'
              rel='noopener noreferrer' /* Prevent tabnabbing security attack */
            >
              Foshati
            </a>
          </p>

          <nav className='grid grid-flow-col gap-4'>
            <Link href='' className='link-hover link'>
              About us
            </Link>
            <Link href='' className='link-hover link'>
              Contact
            </Link>
            <Link href='' className='link-hover link'>
              Jobs
            </Link>
            <Link href='' className='link-hover link'>
              Press kit
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

import Footer from '@/src/components/layout/footer/Footer';
import Header from '@/src/components/layout/header/Header';

export default function RootLayout({children}) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='flex-1 bg-[#101827]'>{children}</main>
      <Footer />
    </div>
  );
}

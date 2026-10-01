import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import BurgerMenuContent from '../Components/Burger-Menu-Content/BurgerMenuContent';

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className='relative min-h-screen flex flex-col bg-[#161a22] text-white'>
      {isMenuOpen && (
        <div className='fixed w-[70%] sm:w-[30%] inset-0 z-50 bg-black/60'>
          <BurgerMenuContent isClose={() => setIsMenuOpen(false)} />
        </div>
      )}

      <Header openFunc={toggleMenu} />

      <main className='flex-1 w-full flex flex-col items-center p-4'>
        <Outlet />
      </main>
    </div>
  );
}
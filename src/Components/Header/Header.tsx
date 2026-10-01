import React from 'react'
import './Header.css'
import BurgerMenu from '../Burger-Menu/BurgerMenu'

type HeaderProps={
  openFunc:() => void;
}
export default function Header({openFunc}:HeaderProps) {
  return (
      <div className='flex w-full box-border items-center justify-between p-4 '>
        <img className='h-6 w-6 sm:h-12 sm:w-12' src="/icons/bible.png" alt="book-icon" />
        <div className='flex justify-between items-center gap-4 '>
        <h1 className='text-small text-lg uppercase header-text-image sm:text-normal sm:text-xl'>Monstriari</h1>
       </div>

      <BurgerMenu openFunc={() => openFunc()}/>
      </div>
  )
}

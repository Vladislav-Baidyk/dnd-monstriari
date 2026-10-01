import React from 'react'
import { Link } from 'react-router-dom';
import ".//BurgerMenuContent.css"
type BurgerMenuContentProps={
    isClose:() => void;
}

export default function BurgerMenuContent({isClose}:BurgerMenuContentProps) {
  return (
    <div className='w-auto h-screen bg-burger-content'>
      <button className='absolute top-[3%] left-[90%] flex items-center justify-center' onClick={isClose}><img className='w-12' src="./icons/close.png" alt="close" /></button>
        <nav className='border-box'>
            <ul className='flex gap-4 flex-col p-4 text-white text-xl font-bold tracking-wide'>
                <li className='underline underline-offset-4'>Monstriari</li>
                <Link to="/">Monsters</Link> 
                <Link to="initiative">Initiative</Link>
                <Link to="randomEncounter">Random Encounter</Link>
            </ul>
        </nav>
    
    </div>
  )
}

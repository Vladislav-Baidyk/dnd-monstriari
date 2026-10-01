import React from 'react'
type ButtonsInitiativeProps={
    onClicked: () => void;
    onReset: () => void;
}
export default function ButtonsInitiative({onClicked,onReset}:ButtonsInitiativeProps) {
  
    return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
        {/*Next turn */}
      <button 
      className='min-w-64 border-box p-4 flex justify-center gap-2 bg-[rgb(198,163,90)] text-[rgba(39,46,56,1)] rounded-xl border-2 border-[rgba(39,46,56,1)]'
      onClick={onClicked}>
        <img className='w-6' src="/icons/lightning.png" alt="icon-lightning" />
        <div className='font-bold'>Next Turn</div>
      </button>
      {/*Reset */}
      <button 
      className='min-w-64 border-box p-4 flex justify-center gap-2 bg-[rgb(31,37,46)] text-white font-bold rounded-xl border-2 border-[rgba(39,46,56,1)]'
      onClick={onReset}>
        <img className='w-6' src="/icons/reset.png" alt="icon-reset" />
        <div>Reset Combat</div>
      </button>
    </div>
  )
}

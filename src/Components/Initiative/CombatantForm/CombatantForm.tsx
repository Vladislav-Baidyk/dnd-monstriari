import React from 'react'

type CombatantFormType ={
  name: string;
  initiative: number;
  maxHp: number;
  ac:number;
  isPlayer: boolean;
  onNameChange: (name: string) => void;
  onInitiativeChange: (val: number) => void;
  onMaxHpChange: (val: number) => void;
  onAc:(val:number) => void;
  onIsPlayerChange: (isPlayer: boolean) => void;
  onAddCombatant: () => void;
}
export default function CombatantForm({
  name,
  initiative,
  maxHp,
  ac,
  isPlayer,
  onNameChange,
  onInitiativeChange,
  onMaxHpChange,
  onAc,
  onIsPlayerChange,
  onAddCombatant
}:CombatantFormType) {

  const handleForm = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    onAddCombatant();
  }
  return (
    <div className='bg-[rgb(31,37,46)] border-box p-4 rounded-xl border-2 border-[rgb(198,163,90)]'>
      <form 
      onSubmit={handleForm}
      className='flex flex-wrap gap-4 items-end justify-center'>

        {/*Name */}
        <div className='flex flex-col text-white opacity-[50%] gap-2 font-bold text-lg sm:text-xl '>
        <label htmlFor="fName">Name</label>
        <input
        placeholder='Aboleth'
        className='border-1 w-35 sm:w-60 border-[rgba(255, 255, 255, 0.59)] rounded-lg sm:rounded-xl p-2 focus:outline-none' 
        onChange={(e) =>onNameChange(e.target.value)} 
        type="text" 
        value={name}
        id="fName" />
        </div>

        {/*Initiative */}
        <div className='flex flex-col  text-white opacity-[50%] gap-2 font-bold text-lg sm:text-xl '>
        <label htmlFor="fInitiative">Initiative</label>
        <input 
        placeholder='18'
        className='border-1 w-32 border-[rgba(255, 255, 255, 0.59)] rounded-lg sm:rounded-xl p-2 focus:outline-none'
        onChange={(e) => onInitiativeChange(Number(e.target.value))}  
        value={initiative || ''}
        type="text" 
        id="fInitiative" />
        </div>

        
        {/*AC */}
        <div className='flex flex-col text-white opacity-[50%] gap-2 font-bold text-lg sm:text-xl '>
        <label htmlFor="fAC">AC</label>
        <input
        placeholder='24'
        className='border-1 w-32 border-[rgba(255, 255, 255, 0.59)] rounded-lg sm:rounded-xl p-2 focus:outline-none'
        onChange={(e) => onAc(Number(e.target.value))}
        value={ac} 
        type="text" 
        id="fAC" />
        </div>

        {/*Max Hp */}
        <div className='flex flex-col text-white opacity-[50%] gap-2 font-bold text-lg sm:text-xl '>
        <label htmlFor="fMaxHp">Max HP</label>
        <input 
        placeholder='24'
        className='border-1 w-32 border-[rgba(255, 255, 255, 0.59)] rounded-lg sm:rounded-xl p-2 focus:outline-none'
        onChange={(e) => onMaxHpChange(Number(e.target.value))} 
        value={maxHp}
        type="text" 
        id="fMaxHP" />
        </div>

        {/*buttons */}
        <div className='flex flex-col flex-wrap gap-2'>
        {/*Player or Monster */}
        <div className='flex gap-2'>
            {/*Player */}
            <button
            type="button"
            className={`font-bold text-lg sm:text-xl p-2 rounded-xl ${isPlayer ? "bg-[rgb(77,110,161)] text-white " : "text-white opacity-[70%] " }`}
            onClick={() => onIsPlayerChange(true)}>Player</button>
            {/*Monster */}
            <button 
            type="button"
            className={`font-bold text-lg sm:text-xl p-2 rounded-xl ${isPlayer ? " text-white opacity-[70%]" : "bg-[rgb(124,51,51)] text-white" }`}
            onClick={() => onIsPlayerChange(false)}>Monster</button>
        </div>
        {/*ADD */}
        <button 
        onClick={() => onAddCombatant}
        className='text-[rgb(198,163,90)] border-2 border-[rgb(198,163,90)] border-box p-2 rounded-xl'>Add Combatant</button>
        </div>
      </form>
    </div>
  )
}

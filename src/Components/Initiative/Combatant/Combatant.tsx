import React, { useState } from 'react'
import type { Condition,  ICombatant } from '../../../Models/ICombatant'

type CombatantProps = {
    combatant:ICombatant;
    onDelete:(val:ICombatant) => void;
    isActive:boolean
}
export default function Combatant({combatant,onDelete,isActive}:CombatantProps) {
  const conditions = [
    'Blinded',
   'Charmed',
   'Deafened',
   'Frightened',
   'Grappled',
   'Incapacitated',
   'Invisible',
   'Paralyzed',
   'Petrified',
   'Poisoned',
   'Prone',
   'Restrained',
   'Stunned',
   'Unconscious',
   'Exhaustion'
  ]
  const [combConditions,setCombConditions] = useState<Condition[]>([]);
  const [health,setHealth] = useState<number>(combatant.maxHp);
  const [healthInput,setHealthInput] = useState<number>(0);

  const handleChooseCondition = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as Condition;
    if(!combConditions.includes(val)){
      setCombConditions([...combConditions,val]);
    }
    e.target.value = '';
  }
  const deleteCond = (val:Condition) => {
    setCombConditions((prev) => prev.filter((cond) => cond !== val))
  }
  const handleHealth = (op:number) => {
    if(op === -1){
      setHealth((prev) => prev-healthInput);
    }
    else{
      if(healthInput + health <= combatant.maxHp){
        setHealth((prev) => prev+healthInput);
      }
    }
  }
  return (
      <div
      className={`min-w-full flex flex-wrap justify-between items-center gap-4 bg-[rgb(31,37,46)] rounded-xl border p-3 sm:p-4 transition-all duration-300 ${
        isActive
          ? 'border-[rgb(198,163,90)] shadow-[0_0_18px_rgba(198,163,90,0.35)] ring-2 ring-[rgb(198,163,90)] bg-[#242c38]'
          : 'border-white/10 opacity-80 hover:opacity-100'
      }`}
        >
      <div className='flex gap-2 sm:gap-4'>
     
      {/*Initiative */}
        <div
          className={`rounded-xl border p-2 sm:p-3 flex items-center justify-center font-bold text-lg sm:text-3xl min-w-16 h-16 transition-colors ${
            isActive
              ? 'bg-[rgb(198,163,90)] text-[#1f252e] border-[rgb(198,163,90)] shadow-md'
              : 'border-[rgb(198,163,90)] text-[rgb(198,163,90)] bg-[#272e38]'
          }`}
        >
        {combatant.initiative}
      </div>

      {/*Name player or monster and ac */}
      <div className='flex flex-col gap-2'>
        {/*Name Playr or monster */}
        <div className='flex flex items-center gap-2'>
        <div className='uppercase font-bold text-white text-xl'>{combatant.name}</div>
        {combatant.isPlayer ? 
        <div className='flex p-1 text-white bg-[rgb(72,115,177)] uppercase text-lg sm:text-xl rounded-xl'>Player</div> 
        :
        <div className='flex p-1 text-white bg-[rgb(124,51,51)] uppercase text-lg sm:text-xl rounded-xl'>Monster</div>}
        </div>

        <div className='flex items-center'>
          {/*Shield */}
            <div className='flex items-center'>
              <img 
              className='w-6 sm:w-8'
              src="/icons/shield.png" 
              alt="shiled icon" />
              <div className='text-white opacity-[70%] tracking-wide'>AC {combatant.ac}</div>
            </div>
            {/*CONDITIONSs */}
            <div className='flex flex-wrap ml-2 gap-2'>
              {/*condtions now */}
              {combConditions.map((cond,index) => (
                <button className='text-white opacity-[70%] z' onClick={() => deleteCond(cond)} key={index}>{cond}</button>
              ))}
              {/*conditions choose */}
              <select 
              className='bg-[#272e38] text-white border border-[#c6a35a]/50 rounded-lg px-2 py-1 text-xs outline-none cursor-pointer'
              defaultValue=''
              onChange={handleChooseCondition}>
              <option value="" disabled>Select your option</option>
              {conditions.map((cond,index) => (
                <option key={index} value={cond}>{cond}</option>
              ))}
              </select>
            </div>
        </div>

      </div>

       </div>

        {/*HP and other stuff */}
        <div className='flex items-center  flex-wrap gap-2'>
          {/*HP */}
          <div className='flex items-center'>
            <img className='h-6' src="/icons/heart.png" alt="health-point-icon" />
            <div className='flex flex-col' >
              <div className='flex justify-between text-white'><span className='opacity-[70%]'>Hit Points</span> <span className='font-bold '>{health}/{combatant.maxHp}</span></div>
              <div className='rounded-xl'><progress value={health} max={combatant.maxHp}/></div>
            </div>
          </div>

          {/*Buttons */}
          <div className='flex gap-4'>
            {/*Operation health */}
          <div className='flex flex-col gap-2 w-24'>
            <input 
            className='bg-[#272e38] w-auto text-white border border-[#c6a35a]/50 rounded-lg px-2 py-1 text-xs outline-none cursor-pointer'
            type="text" 
            onChange={(e) => setHealthInput(Number(e.target.value))} />
          <div className=''>
            <button
            onClick={() => handleHealth(-1)}
            className='border-1 border-[rgba(255,251,251,0.61)] rounded-lg p-2 min-w-12 font-bold text-white text-xl'>-</button>
            <button 
            onClick={() => handleHealth(1)}
            className='border-1 border-[rgba(255,251,251,0.61)] rounded-lg p-2 min-w-12 font-bold text-white text-xl'>+</button>
          </div>
          </div>
          {/*Delete */}
              <button onClick={() => onDelete(combatant)}><img className='h-8' src="/icons/delete.png" alt="delete-icon" /></button>
          </div>

        </div>
    </div>
  )
}

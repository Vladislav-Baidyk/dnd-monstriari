
type TrackerProps={
    round?:number | null;
    currentCombatant:string | null;
    
}
export default function Tracker({round,currentCombatant}:TrackerProps) {
  return (
    <div className='flex gap-4 items-center justify-center'>
      {/*Round */}
      <div className='border-box p-2 sm:p-4 flex flex-col items-center justify-center bg-menu rounded-xl'>
        <div className='text-white opacity-[20%] uppercase tracking-tight text-lg sm:text-2xl'>Round</div>
        <div className='gold-color text-xl font-bold sm:text-2xl'>{round ? round : '1'}</div>
      </div>

      {/*Combatant */}
      <div className='flex  flex-col items-end'>
        <div className='text-white opacity-[20%] text-lg sm:text-2xl'>CURRENT TURN</div>
        <div className='text-white font-bold  text-xl sm:text-2xl'>{currentCombatant ? currentCombatant : '-' }</div>
      </div>
    </div>
  )
}

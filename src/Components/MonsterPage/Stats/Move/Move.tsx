import { UseMonsterData } from "../../../../Services/CustomHooks/UseMonsterData/UseMonsterData";
import "../Stats.css";

export default function Move() {
  const { monster } = UseMonsterData();

  return (
    <div className='border-box p-4 flex flex-col gap-4 items-center justify-center rounded-xl border-ac w-38 h-38 sm:w-48 sm:h-48'>
      <h1 className='light-silver-color uppercase'>Speed</h1>
      <h3 className='text-white font-bold text-lg sm:text-xl'>
        {monster?.speed?.walk ?? '—'}
      </h3>
      <h5 className='light-silver-color'>
        {monster?.speed?.swim ? `swim ${monster.speed.swim}` : '—'}
      </h5>
    </div>
  );
}
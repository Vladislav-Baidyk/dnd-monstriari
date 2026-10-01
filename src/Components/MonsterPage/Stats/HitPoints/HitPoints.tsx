import { UseMonsterData } from "../../../../Services/CustomHooks/UseMonsterData/UseMonsterData";
import "../Stats.css";

export default function HitPoints() {
  const { monster } = UseMonsterData();

  return (
    <div className='border-box p-4 flex flex-col gap-4 items-center justify-center rounded-xl border-ac w-38 h-38 sm:w-48 sm:h-48'>
      <h1 className='light-silver-color uppercase'>Hit Points</h1>
      <h3 className='red-hit-points font-bold text-lg sm:text-xl'>
        {monster?.hit_points ?? '—'}
      </h3>
      <h5 className='light-silver-color'>
        {monster?.hit_points_roll ? `(${monster.hit_points_roll})` : '—'}
      </h5>
    </div>
  );
}
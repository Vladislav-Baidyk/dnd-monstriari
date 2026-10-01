import { UseMonsterData } from "../../../../Services/CustomHooks/UseMonsterData/UseMonsterData";
import "../Stats.css";

export default function Challange() {
  const { monster } = UseMonsterData();

  return (
    <div className='border-box p-4 flex flex-col gap-4 items-center justify-center rounded-xl border-ac w-38 h-38 sm:w-48 sm:h-48'>
      <h1 className='light-silver-color uppercase'>Challenge</h1>
      <h3 className='gold-color font-bold text-lg sm:text-xl'>
        {monster?.challenge_rating ?? '—'}
      </h3>
      <h5 className='light-silver-color'>
        {monster?.xp ? `${monster.xp} xp` : '—'}
      </h5>
    </div>
  );
}
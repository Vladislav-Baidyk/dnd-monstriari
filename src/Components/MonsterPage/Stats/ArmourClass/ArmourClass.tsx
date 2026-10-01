import { UseMonsterData } from "../../../../Services/CustomHooks/UseMonsterData/UseMonsterData";
import "../Stats.css";

export default function ArmourClass() {
  const { monster } = UseMonsterData();

  return (
    <div className='border-box p-4 flex flex-col gap-4 items-center justify-center rounded-xl border-ac w-38 h-38 sm:w-48 sm:h-48'>
      <h1 className='light-silver-color uppercase'>Armour Class</h1>
      <h3 className='gold-color font-bold text-lg sm:text-xl'>
        {monster?.armor_class?.[0]?.value ?? '—'}
      </h3>
      <h5 className='light-silver-color'>
        {monster?.armor_class?.[0]?.type ? `(${monster.armor_class[0].type})` : '—'}
      </h5>
    </div>
  );
}
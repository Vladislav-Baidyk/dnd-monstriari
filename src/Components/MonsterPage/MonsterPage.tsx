import { UseMonsterData } from "../../Services/CustomHooks/UseMonsterData/UseMonsterData";
import "./MonsterPage.css";
import ArmourClass from './Stats/ArmourClass/ArmourClass';
import HitPoints from './Stats/HitPoints/HitPoints';
import Move from './Stats/Move/Move';
import Challange from './Stats/Challange/Challange';
import LegendaryActions from './LegendaryActions/LegendaryActions';
import StatMonster from './Stats/StatsMonster/StatMonster';
import Actions from "./Actions/Actions";
import SpecialTraits from "./SpecialTraits/SpecialTraits";
import MoreStats from "./MoreStats/MoreStats";
import ImageMonster from "./Image/ImageMonster";

export default function MonsterPage() {
  const { monster } = UseMonsterData();

  const monsterSubtitle = monster
    ? `${monster.size ?? ''} ${monster.type ?? ''}${monster.alignment ? `, ${monster.alignment}` : ''}`.trim()
    : '—';

  return (
    <div className='w-full h-auto bg-monster box-border p-4'>
      <div className='border-shell rounded-xl box-border p-4 h-full'>
        {/* TITLE MONSTER */}
        <div className="flex w-[100%] justify-between items-center">
          <div className='flex flex-col gap-4'>
            <h1 className='font-bold name-cl text-xl sm:text-4xl'>
              {monster?.name ?? '—'}
            </h1>
            <h4 className='silver font-thin text-lg sm:text-xl capitalize'>
              {monsterSubtitle}
            </h4>
          </div>
          <ImageMonster />
        </div>

        <div className='line-gold mt-2'></div>

        {/* STAT CONTAINER */}
        <div className='flex flex-col gap-12'>
          <div className='flex flex-wrap items-center justify-center gap-4 mt-12 sm:gap-12'>
            <ArmourClass />
            <HitPoints />
            <Move />
            <Challange />
          </div>

          <StatMonster />
        </div>

        <div className='line-silver mt-4 sm:mt-12'></div>
        <MoreStats />

        <div className='line-silver mt-4 sm:mt-12'></div>
        <SpecialTraits />

        <div className='line-silver mt-4 sm:mt-12'></div>
        <Actions />

        <div className='line-silver mt-4 sm:mt-12'></div>
        <LegendaryActions />
      </div>
    </div>
  );
}
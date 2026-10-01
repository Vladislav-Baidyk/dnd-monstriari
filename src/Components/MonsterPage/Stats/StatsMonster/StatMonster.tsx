import "../Stats.css";
import BoxStatMonster from './BoxStatMonster';
import { CalculateModifier } from '../../../../Services/Functions/Functions';
import { UseMonsterData } from '../../../../Services/CustomHooks/UseMonsterData/UseMonsterData';

export default function StatMonster() {
  const { monster } = UseMonsterData();

  return (
    <div className='border-ac w-full h-auto flex flex-wrap justify-between rounded-xl gap-4 border-box p-4 sm:p-12 sm:gap-12'>
      <BoxStatMonster 
        statName='STR' 
        statInt={monster?.strength ?? '—'} 
        statMod={monster ? CalculateModifier(monster.strength) : undefined}
      />
      <BoxStatMonster 
        statName='DEX' 
        statInt={monster?.dexterity ?? '—'} 
        statMod={monster ? CalculateModifier(monster.dexterity) : undefined}
      />
      <BoxStatMonster 
        statName='CON' 
        statInt={monster?.constitution ?? '—'} 
        statMod={monster ? CalculateModifier(monster.constitution) : undefined}
      />
      <BoxStatMonster 
        statName='INT' 
        statInt={monster?.intelligence ?? '—'} 
        statMod={monster ? CalculateModifier(monster.intelligence) : undefined}
      />
      <BoxStatMonster 
        statName='WIS' 
        statInt={monster?.wisdom ?? '—'} 
        statMod={monster ? CalculateModifier(monster.wisdom) : undefined}
      />
      <BoxStatMonster 
        statName='CHA' 
        statInt={monster?.charisma ?? '—'} 
        statMod={monster ? CalculateModifier(monster.charisma) : undefined}
      />
    </div>
  );
}
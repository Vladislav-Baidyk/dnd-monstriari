import React from 'react';
import type { ICombatant } from '../../../Models/ICombatant';
import Combatant from '../Combatant/Combatant';

type CombatantListProps = {
  listCombatant: ICombatant[];
  onDelete: (comb: ICombatant) => void;
  activeCombatantId: string | null | undefined;
};

export default function CombatantList({ listCombatant, onDelete, activeCombatantId }: CombatantListProps) {
  return (
    <div className='w-full flex flex-col gap-3'>
      {listCombatant.map((comb) => (
        <Combatant
          key={comb.id}
          combatant={comb}
          onDelete={onDelete}
          isActive={comb.id === activeCombatantId}
        />
      ))}
    </div>
  );
}
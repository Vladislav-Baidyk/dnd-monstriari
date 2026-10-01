import { useState } from 'react';
import Tracker from './Tracker/Tracker';
import ButtonsInitiative from './ButtonsMain/ButtonsInitiative';
import CombatantForm from './CombatantForm/CombatantForm';
import type { ICombatant } from '../../Models/ICombatant';
import CombatantList from './CombatantList/CombatantList';

export default function InitiativeMain() {
  const [round, setRound] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  {/* add Combatant */}
  const [combatants, setCombatants] = useState<ICombatant[]>([]);
  const [nameCombatant, setNameCombatant] = useState<string>('');
  const [isAc, setIsAc] = useState<number>(0);
  const [isPlayer, setIsPlayer] = useState(false);
  const [maxHp, setMaxHp] = useState<number>(0);
  const [isInitiative, setInitiative] = useState<number>(0);

  const handleReset = () => {
    setRound(null);
    setCurrentIndex(null);
  };

  const handleCombatant = () => {
    if (!nameCombatant.trim()) return;
    const newCombatant: ICombatant = {
      id: crypto.randomUUID(),
      name: nameCombatant.trim(),
      initiative: isInitiative,
      currentHp: maxHp,
      maxHp: maxHp,
      ac: isAc,
      isPlayer: isPlayer,
      conditions: []
    };

    setCombatants((prev) =>
      [...prev, newCombatant].sort((a, b) => b.initiative - a.initiative)
    );

    setNameCombatant('');
    setMaxHp(0);
    setInitiative(0);
    setIsAc(0);
  };

  const deleteCombatant = (comb: ICombatant) => {
    setCombatants((prev) => prev.filter((combatant) => combatant.id !== comb.id));
    if (combatants.length <= 1) {
      handleReset();
    }
  };

  const handleNextTurn = () => {
    if (combatants.length === 0) return;

    if (currentIndex === null || round === null) {
      setRound(1);
      setCurrentIndex(0);
      return;
    }

    if (currentIndex + 1 >= combatants.length) {
      setRound((prev) => (prev ?? 1) + 1);
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => (prev !== null ? prev + 1 : 0));
    }
  };

  const activeCombatant = currentIndex !== null && combatants[currentIndex] 
    ? combatants[currentIndex].name 
    : null;

  return (
    <div className='flex flex-col w-full items-center gap-4'>
      <title>Initiative | Monstriari</title>
      <meta name="description" content="Here you can track your combat in the game" />
      
      <Tracker round={round} currentCombatant={activeCombatant} />

      <ButtonsInitiative onClicked={handleNextTurn} onReset={handleReset} />

      <div className='w-[90%]'>
        <CombatantForm
          name={nameCombatant}
          onNameChange={setNameCombatant}
          ac={isAc}
          onAc={setIsAc}
          initiative={isInitiative}
          onInitiativeChange={setInitiative}
          maxHp={maxHp}
          onMaxHpChange={setMaxHp}
          isPlayer={isPlayer}
          onIsPlayerChange={setIsPlayer}
          onAddCombatant={handleCombatant}
        />
      </div>

      <div className='w-[90%] mt-2'>
        <CombatantList
          activeCombatantId={currentIndex !== null ? combatants[currentIndex]?.id : null}
          onDelete={deleteCombatant}
          listCombatant={combatants}
        />
      </div>
    </div>
  );
}
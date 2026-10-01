import { useState } from 'react';
import type { IMonster } from '../../../Models/IMonster';

export default function useFilterList(monsters: IMonster[]) {
  const [isMaxAc, setIsMaxAc] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCr, setSelectedCr] = useState<string>(''); 
  const [selectedSize,setSelectedSize] = useState<string>('');
  const [selectedSwim , setSelectedSwim] = useState(false);

  const cleanSearch = search.trim().toLowerCase();

  const getAcValue = (monster: any): number => {
    if (Array.isArray(monster.armor_class) && monster.armor_class.length > 0) {
      return monster.armor_class[0]?.value ?? 0;
    }
    return typeof monster.armor_class === "number" ? monster.armor_class : 0;
  };

  const filteredMonsters = monsters.filter((m: any) => {
    const matchesName = !cleanSearch || m.name.toLowerCase().includes(cleanSearch);
    const matchesCr = selectedCr === '' || m.challenge_rating?.toString() === selectedCr;
    const matchesSize = selectedSize === '' || m.size.toString() === selectedSize;
    const matchesSwim = !selectedSwim || m.speed?.swim;
    return matchesName && matchesCr && matchesSize && matchesSwim;
  });

  const processedList = isMaxAc
    ? [...filteredMonsters].sort((a, b) => getAcValue(b) - getAcValue(a))
    : filteredMonsters;

  return {
    processedList,
    isMaxAc,
    setIsMaxAc,
    search,
    setSearch,
    selectedCr,
    setSelectedCr,
    selectedSize,
    setSelectedSize,
    selectedSwim,
    setSelectedSwim
  };
}
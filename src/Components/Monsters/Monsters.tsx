import { useEffect, useState } from 'react'
import type { IMonster } from "../../Models/IMonster";
import { getAllMonstersFull } from '../../Services/api.service';
import Monster from '../Monster/Monster';
import "../../index.css";
import useMonsterPagination from "../../Services/CustomHooks/Pagination/PaginationMonsterList";
import FilteredMenu from '../FilteredMenu/FilteredMenu';
import FilterListHook from '../../Services/CustomHooks/FilterList/FilterListHook';

export default function Monsters() {
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllMonstersFull()
      .then(creatures => setMonsters(creatures))
      .catch((error) => console.log('Error', error))
      .finally(() => setIsLoading(false));
  }, []);

  const {
    processedList,
    isMaxAc,
    setIsMaxAc,
    setSearch,
    selectedCr,
    setSelectedCr,
    selectedSize,
    setSelectedSize,
    selectedSwim,
    setSelectedSwim
  } = FilterListHook(monsters);

  const { filteredMonsters,handlePrev, handleNext } =
    useMonsterPagination(processedList, 6);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className='w-full'>
      <title>Monsters Library | Monstriari</title>
      <meta name="description" content="Here you can find your monster for the game." />
      <div className='border-box w-[90%] mx-auto p-4 rounded-xl bg-menu mt-6 sm:p-2'>
        <FilteredMenu 
          onSearch={setSearch}
          isMaxAcActive={isMaxAc}
          onToggleAc={() => setIsMaxAc((prev: boolean) => !prev)}
          selectedCr={selectedCr}
          onSelectCr={setSelectedCr}
          selecetedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onSelectedSwim={() => setSelectedSwim((prev: boolean) => !prev)}
          selectedSwim={selectedSwim}
        />
      </div>

      <div className='flex flex-wrap gap-4 border-box p-2 items-center justify-center'>
        {filteredMonsters.map((monster) => (
          <Monster item={monster} key={monster.index} />
        ))}
      </div> 

      <div className='w-full border-box p-4 flex items-center justify-center gap-4 sm:gap-12 lg:gap-24'>
        <button onClick={handlePrev}><img className='h-8' src="/icons/arrow.png" alt="prev" /></button>
        <button onClick={handleNext}><img className='h-8 rotate-180' src="/icons/arrow.png" alt="prev" /></button>
      </div>
    </div>
  );
}
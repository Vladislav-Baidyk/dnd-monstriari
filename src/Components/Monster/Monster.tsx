import type { IMonster } from '../../Models/IMonster';
import { Link } from 'react-router-dom';
import "./Monster.css";
import { useEffect, useState } from 'react';
import { getMonster } from '../../Services/api.service';

type MonsterProps = {
  item: IMonster;
};

export default function Monster({ item }: MonsterProps) {
  const [monster, setMonster] = useState<IMonster | null>(null);

  useEffect(() => {
    getMonster(item.index)
      .then((data) => setMonster(data))
      .catch((err) => console.error(err));
  }, [item.index]);

  const imageUrl = monster?.image
    ? `https://www.dnd5eapi.co${monster.image}`
    : null;

  return (
    <div className='box-monster relative overflow-hidden flex border-box p-4 w-65 rounded-xl h-65 sm:h-80 sm:w-80'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={monster?.name || item.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {imageUrl && (
        <div className="absolute inset-0 bg-[#272e38]/75 pointer-events-none" />
      )}

      <div className='flex items-center justify-center absolute rounded-xl h-8 px-3 font-bold gold-color border-color bg-[#272e38]/80 right-4 top-4 z-10'>
        {monster?.challenge_rating ?? '—'}
      </div>

      <div className='relative z-10 flex flex-col w-full h-full justify-end'>
        <Link className='text-name font-bold text-lg' state={item} to={`/monsters/${item.index}`}>
          {item.name}
          <div className='light-silver-color text-sm capitalize font-normal'>
            {monster?.type}
          </div>
        </Link>

        <div className='line-silver my-2'></div>

        <div className='flex w-full justify-between items-center'>
          <div className='flex items-center gap-2'>
            <img className='h-6 sm:h-8 object-contain' src="/icons/heart.png" alt="heart-icon" />
            <div>
              <h3 className='gold-color font-bold text-xs'>HIT POINTS</h3>
              <h3 className='light-silver-color text-xs sm:text-sm'>
                <span className='text-white font-semibold'>{monster?.hit_points ?? '—'}</span>
                {monster?.hit_points_roll ? ` (${monster.hit_points_roll})` : ''}
              </h3>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <img className='h-6 sm:h-8 object-contain' src="/icons/shield.png" alt="armour-class" />
            <div>
              <h3 className='gold-color font-bold text-xs'>AC</h3>
              <h3 className='light-silver-color text-xs sm:text-sm font-semibold'>
                {monster?.armor_class?.[0]?.value ?? '—'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
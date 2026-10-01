type BoxStatMonsterProps = {
  statName: string;
  statInt?: number | string;
  statMod?: string;
};

export default function BoxStatMonster({ statName, statInt, statMod }: BoxStatMonsterProps) {
  const isLoaded = statInt !== undefined && statInt !== '—';

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <h3 className="gold-color font-semibold">{statName}</h3>
      <h3 className="text-white">
        {isLoaded ? `${statInt} (${statMod})` : '—'}
      </h3>
    </div>
  );
}
import { UseMonsterData } from "../../../Services/CustomHooks/UseMonsterData/UseMonsterData";

export default function SpecialTraits() {
  const { monster } = UseMonsterData();

  const hasTraits = (monster?.special_abilities?.length ?? 0) > 0;

  return (
    <div>
      <h1 className="gold-color font-bold text-xl mt-4">SPECIAL TRAITS</h1>

      {!monster ? (
        <div className="light-silver-color mt-2">—</div>
      ) : hasTraits ? (
        <div className="flex flex-col gap-4 mt-4">
          {monster.special_abilities?.map((ability, index) => (
            <div key={index}>
              <h3 className="font-bold gold-color">{ability.name}</h3>
              <h3 className="light-silver-color">{ability.desc}</h3>
              {ability.usage && (
                <h3 className="light-silver-color">
                  {monster.name} can use it {ability.usage?.times} {ability.usage?.type}.
                </h3>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h3 className="light-silver-color mt-2">Creature doesn't have special traits</h3>
      )}
    </div>
  );
}
import { UseMonsterData } from "../../../Services/CustomHooks/UseMonsterData/UseMonsterData";
import "../Stats/Stats.css";

export default function LegendaryActions() {
  const { monster } = UseMonsterData();
  const hasLegendary = (monster?.legendary_actions?.length ?? 0) > 0;

  return (
    <div className='mt-4'>
      <h1 className='gold-color font-bold text-xl'>LEGENDARY ACTIONS</h1>

      {!monster ? (
        <div className="light-silver-color mt-2">—</div>
      ) : hasLegendary ? (
        <div className="mt-2">
          <h3 className='light-silver-color font-bold'>
            The {monster.name} has {monster.legendary_actions?.length} legendary actions:
          </h3>

          <div className='flex flex-col gap-4 mt-4'>
            {monster.legendary_actions?.map((action, index) => (
              <div className='flex flex-col' key={index}>
                <h2 className='gold-color font-bold'>{action.name}</h2>
                <h2 className='light-silver-color'>{action.desc}</h2>
                {(action.damage?.length ?? 0) > 0 && (
                  <h2 className='gold-color'>
                    {action.damage?.[0].damage_dice} {action.damage?.[0].damage_type?.name}
                  </h2>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="light-silver-color mt-2">Creature doesn't have legendary actions</h3>
      )}
    </div>
  );
}
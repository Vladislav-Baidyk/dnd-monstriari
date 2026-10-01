import { UseMonsterData } from "../../../Services/CustomHooks/UseMonsterData/UseMonsterData";

export default function Actions() {
  const { monster } = UseMonsterData();
  const hasActions = (monster?.actions?.length ?? 0) > 0;

  return (
    <div>
      <h1 className="gold-color font-bold text-xl mt-4">ACTIONS</h1>

      {!monster ? (
        <div className="light-silver-color mt-2">—</div>
      ) : hasActions ? (
        <div className="flex flex-col gap-4 mt-4">
          {monster?.actions?.map((attack, index) => (
            <div className="flex flex-col" key={index}>
              <h3 className="font-bold gold-color">{attack.name}</h3>
              <h3 className="light-silver-color">{attack.desc}</h3>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="light-silver-color mt-2">No actions available</h3>
      )}
    </div>
  );
}
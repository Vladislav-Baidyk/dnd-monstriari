import { UseMonsterData } from "../../../Services/CustomHooks/UseMonsterData/UseMonsterData";

export default function MoreStats() {
  const { monster } = UseMonsterData();

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Saving throws */}
      <div className="flex flex-wrap gap-2 items-center">
        <h3 className="font-bold gold-color">Saving Throws:</h3>
        {!monster ? (
          <span className="light-silver-color">—</span>
        ) : (monster.proficiencies?.length ?? 0) > 0 ? (
          monster.proficiencies.map((savThrows, index) => (
            <div className="flex items-center gap-2 mr-2" key={index}>
              <h3 className="font-bold gold-color">
                {savThrows.proficiency.name.split(':').pop()?.trim()}
              </h3>
              <h3 className="light-silver-color underline">+{savThrows.value}</h3>
            </div>
          ))
        ) : (
          <span className="light-silver-color">None</span>
        )}
      </div>

      {/* Senses */}
      <div className="flex gap-2 flex-wrap items-center">
        <h3 className="font-bold gold-color">Senses:</h3>
        {!monster ? (
          <span className="light-silver-color">—</span>
        ) : monster.senses && Object.keys(monster.senses).length > 0 ? (
          Object.entries(monster.senses).map(([key, value], index, arr) => (
            <div key={key} className="flex items-center gap-1">
              <span className="light-silver-color capitalize">
                {key.replace("_", " ")}
              </span>
              <span className="gold-color font-semibold">{value}</span>
              {index < arr.length - 1 && <span className="text-gray-400">,</span>}
            </div>
          ))
        ) : (
          <span className="light-silver-color">—</span>
        )}
      </div>

      {/* Languages */}
      <div>
        <h3 className="light-silver-color">
          <span className="gold-color font-bold">Known languages:</span>{" "}
          {monster?.languages || (monster ? "None" : "—")}
        </h3>
      </div>
    </div>
  );
}
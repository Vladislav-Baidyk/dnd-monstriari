import { useState } from "react";
import { UseMonsterData } from "../../../Services/CustomHooks/UseMonsterData/UseMonsterData";

export default function ImageMonster() {
  const { monster } = UseMonsterData();
  const [isOpen, setIsOpen] = useState(false);

  if (!monster) {
    return <div className="light-silver-color text-xs">—</div>;
  }

  if (!monster.image) {
    return <div className="light-silver-color text-xs italic">No image in API</div>;
  }

  const imageUrl = monster.image.startsWith('http')
    ? monster.image
    : `https://www.dnd5eapi.co${monster.image}`;

  return (
    <div>
      {isOpen ? (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <img
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl cursor-pointer"
            src={imageUrl}
            alt={monster.name}
          />
        </div>
      ) : (
        <img
          className="h-12 sm:h-20 rounded-xl object-contain cursor-pointer transition-transform hover:scale-105"
          onClick={() => setIsOpen(true)}
          src={imageUrl}
          alt={monster.name}
        />
      )}
    </div>
  );
}
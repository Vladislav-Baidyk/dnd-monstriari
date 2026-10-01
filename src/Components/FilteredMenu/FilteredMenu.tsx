import CR from './CR';
import Size from './Size';
import Swim from './Swim';

type FilteredMenuProps={
    onSearch: (text:string) => void;
    onToggleAc: () => void;
    isMaxAcActive: boolean;
    selectedCr: string;
    onSelectCr: (cr: string) => void;
    onSelectSize: (val:string) => void;
    selecetedSize:string;
    selectedSwim :boolean;
    onSelectedSwim:() => void;
}
export default function FilteredMenu(
  {onSearch,
    onToggleAc,
    isMaxAcActive,
    selectedCr,
    onSelectCr,
    onSelectSize,
    selecetedSize,
    selectedSwim,
    onSelectedSwim} : FilteredMenuProps
  ) {
  const crArr = [
    0,
    0.125, 
    0.25, 
    0.5,  
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ];  

  const sizesArr = [
  "Tiny",
  "Small",
  "Medium",
  "Large",
  "Huge",
  "Gargantuan"
]
  return (
    <div className='flex flex-col items-start justify-center'>
        {/*Search */}
      <div className='border-box w-full p-4 rounded-xl bg-menu flex gap-2 sm:p-2 text-white'>
        <img className='w-6 opacity-[80%]' src="/icons/search.png" alt="search" />
      <input 
      className='w-full focus:outline-none'
      placeholder='Find your monster'
      onChange={(e) => onSearch(e.target.value)}
      type="text" />
        </div>

      <div className='flex flex-wrap mt-2'>

      <button
      className={`px-4 py-2 rounded-lg border border-[rgba(198,163,90,0.4)] ${
          isMaxAcActive ? "bg-[#c6a35a] text-black font-bold" : "gold-color"
        }`}
         onClick={onToggleAc}>AC</button>
      {/*Challange rating */}
      {crArr.map((cr) => {
          const strValue = cr.toString();
          return (
            <CR
              key={strValue}
              value={strValue}
              isSelected={selectedCr === strValue}
              onSelect={(val) => onSelectCr(val === selectedCr ? '' : val)} 
            />
          );
        })}

      {/*Size rating */}
      {sizesArr.map((size) => (
        <Size
          key={size}
          valueSize={size}
          isSelectedSize={selecetedSize === size}
          onSelectSize={(val) => onSelectSize(val === selecetedSize ? '': val)}
        />
      ))}
            {/*Swim */}
      <Swim onSwimSelected={onSelectedSwim} isSelectedSwim={selectedSwim}/>
      </div>
    </div>
  )
}

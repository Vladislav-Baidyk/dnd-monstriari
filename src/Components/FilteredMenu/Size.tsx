

type SizeProps = {
    isSelectedSize : boolean;
    valueSize :string;
    onSelectSize:(val:string) => void;
}
export default function Size({isSelectedSize,valueSize,onSelectSize}:SizeProps) {

  return (
    <div className={`px-4 py-2 w-auto min-w-8 text-sm sm:min-w-12 flex items-center justify-center rounded-lg border border-[rgba(198,163,90,0.4)] ${
          isSelectedSize ? "bg-[#c6a35a] text-black font-bold" : "gold-color"
        }`}>
      <button onClick={() => onSelectSize(valueSize)}>{valueSize}</button>
    </div>
  )
}

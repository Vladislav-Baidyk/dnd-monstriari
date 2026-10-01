
type CRProps={
  onSelect: (val: string) => void;
  value: string;
  isSelected: boolean;
}
export default function CR({onSelect,value,isSelected}:CRProps) {
  return (
    <div className={`px-4 py-2 w-8 sm:w-12 flex items-center justify-center rounded-lg border border-[rgba(198,163,90,0.4)] ${
          isSelected ? "bg-[#c6a35a] text-black font-bold" : "gold-color"
        }`}>
      <button onClick={() => onSelect(value)}>{value}</button>
    </div>
  )
}

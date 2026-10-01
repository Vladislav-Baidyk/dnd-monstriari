
type SwimProps = {
    isSelectedSwim:boolean;
    onSwimSelected:() => void;
}
export default function Swim({isSelectedSwim,onSwimSelected}:SwimProps) {
  return (
    <div className={`px-4 py-2 w-auto min-w-8 text-sm sm:min-w-12 flex items-center justify-center rounded-lg border border-[rgba(198,163,90,0.4)] ${
          isSelectedSwim ? "bg-[#c6a35a] text-black font-bold" : "gold-color"
        }`}>
      <button onClick={() => onSwimSelected()}>Swim</button>
    </div>
  )
}

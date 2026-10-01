
type BurgerMenuProps={
    openFunc:() => void;
}
export default function BurgerMenu({openFunc}:BurgerMenuProps) {
  
    return (
    <div>
      <button className="flex items-center justify-center" onClick={openFunc}><img className="h-8 w-8" src="/icons/burger-menu.png" alt="burger-menu-icon" /></button>
    </div>
  )
}

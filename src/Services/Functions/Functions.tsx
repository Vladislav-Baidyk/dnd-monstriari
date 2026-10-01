export const CalculateModifier= (stat:number) => {
    const mod = Math.floor((stat-10)/2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
}
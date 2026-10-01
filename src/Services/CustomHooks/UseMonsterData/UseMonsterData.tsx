import { useEffect, useState } from 'react'
import type { IMonster } from '../../../Models/IMonster';
import { useParams } from 'react-router-dom';
import { getMonster } from '../../../Services/api.service';
import "../../../Components/MonsterPage/Stats/Stats.css";


export const UseMonsterData = () => {
    const [monster,setMonster] = useState<IMonster | null>(null);
    const [loading,setLoading] = useState(false);
    const {index} = useParams<{index:string}>();
            
            useEffect(() => {
                    setLoading(true);
                    if(index)
                    getMonster(index)
                    .then((data) => setMonster(data))
                    .catch((err) => console.log(err))
                    .finally(() => setLoading(false));
            
                },[monster])
    return {monster,loading}
}
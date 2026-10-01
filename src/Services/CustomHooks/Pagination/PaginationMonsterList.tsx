    import { useState } from 'react'
    import type { IMonster } from '../../../Models/IMonster';

    export default function PaginationMonsterList(monsters: IMonster[], itemsPerPage: number = 6) {
        const [currentPage,setCurrentPage] = useState(1);
        const monstersPerPage = itemsPerPage;
        const totalPages = Math.ceil(monsters.length/itemsPerPage);
        const startIndex = (currentPage - 1) * monstersPerPage;
        const lastIndex = (startIndex + itemsPerPage);

        const filteredMonsters = monsters.slice(startIndex,lastIndex);
        const handlePrev = () => {
        if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        }
    };

    return {
        filteredMonsters,
        currentPage,
        totalPages,
        handlePrev,
        handleNext,
    };

    }

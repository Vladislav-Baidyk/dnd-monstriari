  const baseUrl = import.meta.env.VITE_API_URL;

  export const getAllMonsters = async () => {
          const monsters =  await fetch(baseUrl)
              .then(res => res.json());
          return monsters.results;
      }

  export const getMonster= async (name:string) => {
      const monster = await fetch(baseUrl + '/' + name)
          .then(res => res.json());
      return monster;
  }    
  export const getAllMonstersFull = async () => {
    const cached = localStorage.getItem("dnd_monsters_full");
    if (cached) {
      return JSON.parse(cached);
    }


    const baseRes = await fetch(baseUrl);
    const baseData = await baseRes.json();
    const monstersList = baseData.results;

    const fullDetails: any[] = [];
    const chunkSize = 5;

    for (let i = 0; i < monstersList.length; i += chunkSize) {
      const chunk = monstersList.slice(i, i + chunkSize);
      const promises = chunk.map((m: any) => 
        fetch(`${baseUrl}/${m.index}`).then((r) => r.json())
      );
      const results = await Promise.all(promises);
      fullDetails.push(...results);
    }

    localStorage.setItem("dnd_monsters_full", JSON.stringify(fullDetails));
    return fullDetails;
  };
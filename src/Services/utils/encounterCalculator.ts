export type Difficulty = 'easy' | 'medium' | 'hard' | 'deadly';

export interface ApiMonster {
  index: string;
  name: string;
  challenge_rating: number;
  xp: number;
  hit_points: number;
  armor_class: Array<{ value: number }> | number;
  type?: string;
}

export interface EncounterGroup {
  monster: ApiMonster;
  count: number;
}

export interface GeneratedEncounter {
  title: string;
  groups: EncounterGroup[];
  totalRawXP: number;
  adjustedXP: number;
  targetBudget: number;
  difficulty: Difficulty;
}

const XP_THRESHOLDS: Record<number, Record<Difficulty, number>> = {
  1:  { easy: 25,   medium: 50,   hard: 75,   deadly: 100 },
  2:  { easy: 50,   medium: 100,  hard: 150,  deadly: 200 },
  3:  { easy: 75,   medium: 150,  hard: 225,  deadly: 400 },
  4:  { easy: 125,  medium: 250,  hard: 375,  deadly: 500 },
  5:  { easy: 250,  medium: 500,  hard: 750,  deadly: 1100 },
  6:  { easy: 300,  medium: 600,  hard: 900,  deadly: 1400 },
  7:  { easy: 350,  medium: 750,  hard: 1100, deadly: 1700 },
  8:  { easy: 450,  medium: 900,  hard: 1400, deadly: 2100 },
  9:  { easy: 550,  medium: 1100, hard: 1600, deadly: 2400 },
  10: { easy: 600,  medium: 1200, hard: 1900, deadly: 2800 },
  11: { easy: 800,  medium: 1600, hard: 2400, deadly: 3600 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
};

const MULTIPLIERS = [
  { min: 1, max: 1, val: 1.0 },
  { min: 2, max: 2, val: 1.5 },
  { min: 3, max: 6, val: 2.0 },
  { min: 7, max: 10, val: 2.5 },
  { min: 11, max: 14, val: 3.0 },
  { min: 15, max: 999, val: 4.0 }
];

export function getPartyThresholds(partySize: number, avgLevel: number) {
  const safeSize = Math.max(1, partySize || 1);
  const safeLevel = Math.min(Math.max(avgLevel || 1, 1), 20);
  const row = XP_THRESHOLDS[safeLevel];

  return {
    easy: row.easy * safeSize,
    medium: row.medium * safeSize,
    hard: row.hard * safeSize,
    deadly: row.deadly * safeSize
  };
}

function getAdjustedMultiplier(count: number, partySize: number): number {
  if (count <= 0) return 1;
  const steps = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0];
  const found = MULTIPLIERS.find((m) => count >= m.min && count <= m.max)?.val || 4.0;
  let idx = steps.indexOf(found);

  if (partySize >= 6 && idx > 0) idx -= 1;
  if (partySize < 3 && idx < steps.length - 1) idx += 1;

  return steps[idx];
}

function getRandomItem<T>(arr: T[]): T | null {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateEncounterPair(
  partySize: number,
  avgLevel: number,
  difficulty: Difficulty,
  monsters: ApiMonster[]
): { encounterA: GeneratedEncounter | null; encounterB: GeneratedEncounter | null } {
  const validSize = Math.max(1, partySize || 1);
  const validLevel = Math.min(Math.max(avgLevel || 1, 1), 20);

  if (!monsters.length) return { encounterA: null, encounterB: null };

  const targetBudget = getPartyThresholds(validSize, validLevel)[difficulty];

  // Динамічний поріг CR під будь-який рівень
  const minCR = Math.max(0.25, Math.floor(validLevel / 3));
  const maxCR = Math.min(24, Math.ceil(validLevel * 1.5));
  const pool = monsters.filter((m) => m.challenge_rating >= minCR && m.challenge_rating <= maxCR);

  if (!pool.length) return { encounterA: null, encounterB: null };

  // --- Варіант A: Leader & Retinue ---
  const bossPool = pool.filter((m) => m.challenge_rating >= validLevel * 0.7);
  const boss = getRandomItem(bossPool.length ? bossPool : pool);
  let groupsA: EncounterGroup[] = [];

  if (boss) {
    groupsA.push({ monster: boss, count: 1 });
    const minionPool = pool.filter((m) => m.challenge_rating <= boss.challenge_rating / 2);
    const minion = getRandomItem(minionPool.length ? minionPool : pool);

    if (minion && minion.index !== boss.index) {
      let count = 0;
      while (count < 12) {
        const testCount = count + 1;
        const raw = boss.xp + minion.xp * testCount;
        const mult = getAdjustedMultiplier(1 + testCount, validSize);
        if (raw * mult > targetBudget * 1.15) break;
        count = testCount;
      }
      if (count > 0) groupsA.push({ monster: minion, count });
    }
  }

  // --- Варіант B: Pack Assault ---
  const midPool = pool.filter(
    (m) => m.challenge_rating <= validLevel && m.challenge_rating >= minCR
  );
  const packBase = getRandomItem(midPool.length ? midPool : pool);
  let groupsB: EncounterGroup[] = [];

  if (packBase) {
    let count = 1;
    while (count < 16) {
      const testCount = count + 1;
      const raw = packBase.xp * testCount;
      const mult = getAdjustedMultiplier(testCount, validSize);
      if (raw * mult > targetBudget * 1.1) break;
      count = testCount;
    }
    groupsB.push({ monster: packBase, count: Math.max(1, count) });
  }

  const buildData = (title: string, groups: EncounterGroup[]): GeneratedEncounter => {
    const rawXP = groups.reduce((sum, g) => sum + g.monster.xp * g.count, 0);
    const totalCount = groups.reduce((sum, g) => sum + g.count, 0);
    const mult = getAdjustedMultiplier(totalCount, validSize);
    return {
      title,
      groups,
      totalRawXP: rawXP,
      adjustedXP: Math.round(rawXP * mult),
      targetBudget,
      difficulty
    };
  };

  return {
    encounterA: groupsA.length ? buildData('Option A: Leader & Retinue', groupsA) : null,
    encounterB: groupsB.length ? buildData('Option B: Pack Assault', groupsB) : null
  };
}
import React, { useEffect, useState } from 'react';
import { getAllMonstersFull } from '../../Services/api.service';
import {
  type Difficulty,
  type ApiMonster,
  type GeneratedEncounter,
  getPartyThresholds,
  generateEncounterPair
} from '../../Services/utils/encounterCalculator';

interface EncounterPageProps {
  onAddToInitiative?: (monsters: Array<{ name: string; hp: number; isPlayer: boolean }>) => void;
}

export const EncounterPage: React.FC<EncounterPageProps> = ({ onAddToInitiative }) => {
  const [monsters, setMonsters] = useState<ApiMonster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [partySize, setPartySize] = useState<number>(7);
  const [avgLevel, setAvgLevel] = useState<number>(5);

  const [difficulty, setDifficulty] = useState<Difficulty>('deadly');
  const [pair, setPair] = useState<{
    encounterA: GeneratedEncounter | null;
    encounterB: GeneratedEncounter | null;
  }>({ encounterA: null, encounterB: null });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getAllMonstersFull();
        setMonsters(data);
      } catch (err) {
        console.error('Failed to load monsters', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleRoll = () => {
    if (!monsters.length) return;
    const res = generateEncounterPair(partySize, avgLevel, difficulty, monsters);
    setPair(res);
  };

  const budgets = getPartyThresholds(partySize, avgLevel);

  const getAC = (monster: ApiMonster): number => {
    if (Array.isArray(monster.armor_class) && monster.armor_class.length > 0) {
      return monster.armor_class[0].value;
    }
    if (typeof monster.armor_class === 'number') {
      return monster.armor_class;
    }
    return 10;
  };

  const transferToTracker = (enc: GeneratedEncounter) => {
    if (!onAddToInitiative) return;
    const roster: Array<{ name: string; hp: number; isPlayer: boolean }> = [];
    enc.groups.forEach((g) => {
      for (let i = 1; i <= g.count; i++) {
        roster.push({
          name: g.count > 1 ? `${g.monster.name} #${i}` : g.monster.name,
          hp: g.monster.hit_points,
          isPlayer: false
        });
      }
    });
    onAddToInitiative(roster);
  };

  const renderEncounterCard = (enc: GeneratedEncounter | null) => {
    if (!enc) {
      return (
        <div className="flex-1 bg-[#1f242d] border border-[#c6a35a]/30 rounded-xl p-5 text-center text-zinc-400">
          No combination found. Try adjusting levels or difficulty.
        </div>
      );
    }

    return (
      <div className="flex-1 bg-[#1f242d] border border-[#c6a35a] shadow-[0px_2px_15px_5px_rgba(198,163,90,0.25)] rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-[#c6a35a]/30 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-[#c6a35a]">{enc.title}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-[#161a22] border border-[#c6a35a] rounded text-[#c6a35a] uppercase">
              {enc.difficulty}
            </span>
          </div>

          <div className="space-y-3 mb-5">
            {enc.groups.map((g, idx) => (
              <div
                key={idx}
                className="bg-[#161a22] p-3 rounded-lg border border-[#c6a35a]/40 flex justify-between items-center gap-2"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-zinc-200 text-sm truncate">
                    {g.count}x {g.monster.name}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    CR: {g.monster.challenge_rating} • AC: {getAC(g.monster)} • HP: {g.monster.hit_points}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-[#c6a35a]">
                    {g.monster.xp * g.count} XP
                  </span>
                  <div className="text-[10px] text-zinc-400">({g.monster.xp} ea)</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-zinc-400 mb-4 bg-[#161a22] p-2.5 rounded border border-zinc-800 flex justify-between gap-1 text-[11px]">
            <span>Raw: <b className="text-zinc-200">{enc.totalRawXP}</b></span>
            <span>Adjusted: <b className="text-[#c6a35a]">{enc.adjustedXP}</b></span>
            <span>Target: <b className="text-zinc-200">{enc.targetBudget}</b></span>
          </div>

          {onAddToInitiative && (
            <button
              type="button"
              onClick={() => transferToTracker(enc)}
              className="w-full py-2.5 bg-[#161a22] border border-[#c6a35a] text-[#c6a35a] hover:bg-[#c6a35a] hover:text-[#161a22] font-semibold transition-all rounded text-sm active:scale-98 cursor-pointer"
            >
              Add to Initiative Tracker
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-[#c6a35a] font-sans pb-10">
      <title>Random Encounter Generator | Monstriari</title>
      <meta name="description" content="Balance combat encounters based on party level and action economy." />
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-wide mb-2">
          Random Encounter Generator
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Calculated for action economy, party composition, and Challenge Rating floors.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-[#1f242d] border border-[#c6a35a] shadow-[0px_2px_15px_5px_rgba(198,163,90,0.15)] rounded-xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-5 lg:items-end justify-between">
          
          {/* Party Configuration Inputs */}
          <div className="grid grid-cols-2 sm:flex gap-3">
            <div>
              <label htmlFor="players-input" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-semibold">
                Players
              </label>
              <input
                id="players-input"
                type="number"
                min={1}
                max={12}
                value={partySize}
                onChange={(e) => setPartySize(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full sm:w-24 h-11 bg-[#161a22] border border-[#c6a35a] text-[#c6a35a] font-bold rounded-lg px-3 text-center focus:outline-none focus:ring-1 focus:ring-[#c6a35a]"
              />
            </div>

            <div>
              <label htmlFor="avg-level-input" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-semibold">
                Avg Level
              </label>
              <input
                id="avg-level-input"
                type="number"
                min={1}
                max={20}
                value={avgLevel}
                onChange={(e) =>
                  setAvgLevel(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))
                }
                className="w-full sm:w-24 h-11 bg-[#161a22] border border-[#c6a35a] text-[#c6a35a] font-bold rounded-lg px-3 text-center focus:outline-none focus:ring-1 focus:ring-[#c6a35a]"
              />
            </div>
          </div>

          {/* Difficulty Toggles (на мобілці 2 колонки, на десктопі 4 в ряд) */}
          <div className="w-full lg:w-auto">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-semibold">
              Difficulty
            </span>
            <div className="grid grid-cols-2 sm:flex gap-2">
              {(['easy', 'medium', 'hard', 'deadly'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 h-11 rounded-lg text-xs font-semibold capitalize border transition-all cursor-pointer ${
                    difficulty === d
                      ? 'bg-[#c6a35a] text-[#161a22] border-[#c6a35a]'
                      : 'border-[#c6a35a]/50 text-zinc-400 hover:text-[#c6a35a]'
                  }`}
                >
                  {d} <span className="block text-[10px] opacity-80">{budgets[d]} XP</span>
                </button>
              ))}
            </div>
          </div>

          {/* Roll Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleRoll}
            className="w-full lg:w-auto px-6 h-11 bg-[#c6a35a] text-[#161a22] font-bold rounded-lg shadow-[0px_2px_15px_5px_rgba(198,163,90,0.35)] hover:bg-[#d8b66e] transition-all disabled:opacity-50 active:scale-95 cursor-pointer shrink-0"
          >
            {loading ? 'Caching Monsters...' : 'Roll Encounters'}
          </button>
        </div>
      </div>

      {/* Results View */}
      {pair.encounterA || pair.encounterB ? (
        <div className="flex flex-col md:flex-row gap-5">
          {renderEncounterCard(pair.encounterA)}
          {renderEncounterCard(pair.encounterB)}
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-500 border border-dashed border-[#c6a35a]/20 rounded-xl text-sm">
          Hit &quot;Roll Encounters&quot; to generate balanced options.
        </div>
      )}
    </div>
  );
};
export type Condition =
  | 'Blinded'
  | 'Charmed'
  | 'Deafened'
  | 'Frightened'
  | 'Grappled'
  | 'Incapacitated'
  | 'Invisible'
  | 'Paralyzed'
  | 'Petrified'
  | 'Poisoned'
  | 'Prone'
  | 'Restrained'
  | 'Stunned'
  | 'Unconscious'
  | 'Exhaustion';

export interface ICombatant {
  id: string;
  name: string;
  initiative: number;
  currentHp: number;
  maxHp: number;
  ac: number;
  isPlayer: boolean;
  conditions: Condition[];
}
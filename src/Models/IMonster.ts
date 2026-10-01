export interface IMonster {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: ArmorClass[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: ProficiencyElement[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: any[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
  special_abilities?: SpecialAbility[];
  actions?: IMonsterAction[];
  legendary_actions?: LegendaryAction[];
  image?: string;
  url: string;
  updated_at?: string | Date;
  forms?: any[];
  reactions?: any[];
}

export interface ArmorClass {
  type: string;
  value: number;
}

export interface Speed {
  walk?: string;
  swim?: string;
  fly?: string;
  climb?: string;
  burrow?: string;
}

export interface ProficiencyElement {
  value: number;
  proficiency: NamedAPIResource;
}

export interface Senses {
  passive_perception: number;
  darkvision?: string;
  blindsight?: string;
  truesight?: string;
  tremorsense?: string;
}

export interface NamedAPIResource {
  index: string;
  name: string;
  url: string;
}

export interface Damage {
  damage_type: NamedAPIResource;
  damage_dice: string;
}

export interface Dc {
  dc_type: NamedAPIResource;
  dc_value: number;
  success_type: string;
}


export interface ActionUsage {
  type: string; 
  times?: number;
  dice?: string;
  min_value?: number;
  rest_types?: string[];
}

export interface SubAction {
  action_name: string;
  count: string | number;
  type: string;
}

export interface IMonsterAction {
  name: string;
  desc: string;
  attack_bonus?: number;
  damage?: Damage[];
  dc?: Dc;
  usage?: ActionUsage;
  multiattack_type?: string;
  actions?: SubAction[];
}

export interface SpecialAbility {
  name: string;
  desc: string;
  damage?: Damage[];
  dc?: Dc;
  usage?: ActionUsage;
}

export interface LegendaryAction {
  name: string;
  desc: string;
  damage?: Damage[];
  dc?: Dc;
  usage?: ActionUsage;
}
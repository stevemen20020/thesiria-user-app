export type RolledStat = {
  id: string;
  value: number;
};

export type StatKey =
  | "strength"
  | "dexterity"
  | "defense"
  | "aim"
  | "vision"
  | "speed"
  | "handcraft"
  | "agility"
  | "charisma"
  | "wisdom";

export type CardLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const STATS: {
  key: StatKey;
  label: string;
}[] = [
  {
    key: "strength",
    label: "STR",
  },

  {
    key: "dexterity",
    label: "DEX",
  },

  {
    key: "defense",
    label: "DEF",
  },

  {
    key: "aim",
    label: "AIM",
  },

  {
    key: "vision",
    label: "VIS",
  },

  {
    key: "speed",
    label: "SPD",
  },

  {
    key: "handcraft",
    label: "HNC",
  },

  {
    key: "agility",
    label: "AGI",
  },

  {
    key: "wisdom",
    label: "WIS",
  },

  {
    key: "charisma",
    label: "CHA",
  },
];

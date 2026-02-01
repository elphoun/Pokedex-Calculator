import type { Move } from "../types";

// Export searchPokemon from pull.ts
export { searchPokemon } from "./pull";

// Mock items database - replace with actual items later
export const ITEMS = [
  "Choice Band",
  "Choice Scarf",
  "Choice Specs",
  "Life Orb",
  "Focus Sash",
  "Assault Vest",
  "Leftovers",
  "Rocky Helmet",
  "Safety Goggles",
  "Heavy-Duty Boots",
  "Eviolite",
  "Expert Belt",
  "Weakness Policy",
  "Air Balloon",
  "White Herb",
  "Mental Herb",
  "Power Herb",
  "Terrain Extender",
  "Heat Rock",
  "Damp Rock",
  "Smooth Rock",
  "Icy Rock",
  "Light Clay",
  "Grip Claw",
  "Muscle Band",
  "Wise Glasses",
  "Shell Bell",
  "Metronome",
  "Zoom Lens",
  "Wide Lens",
];

// Mock moves database - replace with actual moves later
export const MOVES_DATABASE: Move[] = [
  {
    name: "Tackle",
    type: "Normal",
    category: "Physical",
    basePower: 40,
    accuracy: 100,
  },
  {
    name: "Flamethrower",
    type: "Fire",
    category: "Special",
    basePower: 90,
    accuracy: 100,
  },
  {
    name: "Hydro Pump",
    type: "Water",
    category: "Special",
    basePower: 110,
    accuracy: 80,
  },
  {
    name: "Earthquake",
    type: "Ground",
    category: "Physical",
    basePower: 100,
    accuracy: 100,
  },
];

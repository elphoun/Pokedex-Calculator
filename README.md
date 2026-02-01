# Pokédex Calculator - Browser Extension

A fast, streamlined damage calculator for competitive Pokémon battles. Built for speed and clarity during live matches.

## Features

### Core Functionality
- **Side-by-Side Layout**: Attacker and Defender panels displayed simultaneously
- **Quick Pokémon Search**: Fast lookup with autocomplete
- **Damage Estimation**: Real-time calculation of damage ranges
- **Battle Configuration**: 
  - Status conditions (Burn, Paralysis, Poison, etc.)
  - Stat boosts/drops (-6 to +6)
  - Items (Choice Band, Life Orb, etc.)
  - Abilities
  - Tera Types

### Field Conditions
- **Weather Effects**: Sun, Rain, Sandstorm, Snow
  - Sun: 1.5x Fire damage, 0.5x Water damage
  - Rain: 1.5x Water damage, 0.5x Fire damage
- **Terrain Effects**: Electric, Grassy, Misty, Psychic
  - 1.3x damage boost for respective types
  - Misty reduces Dragon-type damage
- **Side Conditions**: 
  - Reflect (halves physical damage)
  - Light Screen (halves special damage)
  - Tailwind (for future speed calculations)
- **Global Conditions**: Trick Room

### Battle Intelligence
- Displays damage as percentage ranges (min% - max%)
- Shows KO indicators (OHKO, 2HKO, 3HKO)
- Type effectiveness calculations
- STAB (Same Type Attack Bonus) support
- Item modifier calculations
- Status condition effects (burn halving physical attack, etc.)
- Weather and terrain bonuses/penalties

## How to Use

### Basic Workflow
1. **Select Attacker**: Search for your Pokémon in the left "Attacker" panel
2. **Configure Attacker**: Set items, abilities, status, and stat boosts
3. **Select Defender**: Choose opponent's Pokémon in right "Defender" panel
4. **Configure Defender**: Apply relevant modifiers
5. **Set Field Conditions**: Configure weather, terrain, and side conditions at the bottom
6. **View Results**: Damage calculations appear automatically in each panel

### Quick Reference
- **Status Icons**: Click to toggle status conditions
- **Stat Boost Buttons**: Click repeatedly to cycle through -6 to +6
- **Field Conditions**: Click buttons to toggle weather, terrain, and screens
- **Empty Panel**: Click the X button in search to clear selection

## Layout

```
┌─────────────────────────────────────────────┐
│          Pokédex Calculator Header          │
├──────────────────┬──────────────────────────┤
│                  │                          │
│  Attacker Panel  │   Defender Panel         │
│  (Left)          │   (Right)                │
│                  │                          │
│  - Search        │   - Search               │
│  - Sprite        │   - Sprite               │
│  - Items/Ability │   - Items/Ability        │
│  - Status        │   - Status               │
│  - Stat Boosts   │   - Stat Boosts          │
│  - Damage Dealt  │   - Damage Received      │
│                  │                          │
├──────────────────┴──────────────────────────┤
│          Field Conditions Section           │
│  Weather | Terrain | Side Conditions        │
└─────────────────────────────────────────────┘
```

## Technical Details

### Damage Formula
Uses a simplified Pokémon damage formula including:
- Base power and stats
- Stat stage modifiers
- Type effectiveness
- STAB bonus (1.5x)
- Item bonuses
- Status effects
- Random damage roll (85%-100%)

### Mock Data
The current version includes 12 popular Pokémon and 6 common moves for demonstration:
- **Pokémon**: Charizard, Greninja, Garchomp, Zacian, Lucario, and more
- **Moves**: Close Combat, Earthquake, Ice Punch, Hydro Pump, etc.

## Browser Extension Installation

### Chrome/Edge/Brave (Development Mode)
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the extension folder
5. Click the extension icon in your toolbar

### Production Build
For production use, the app would need to be bundled and submitted to browser extension stores.

## Project Structure

```
/
├── components/          # React components
│   ├── PokemonPanel.tsx    # Main panel component
│   ├── PokemonSelector.tsx # Search & select
│   ├── StatusIcon.tsx      # Status condition icons
│   ├── StatBoostButton.tsx # Stat modifier buttons
│   └── MoveDisplay.tsx     # Damage result display
├── data/
│   └── pokemon.ts       # Mock Pokémon & moves database
├── types/
│   └── pokemon.ts       # TypeScript type definitions
├── utils/
│   └── damageCalculator.ts # Damage calculation logic
├── App.tsx              # Main application
└── manifest.json        # Extension configuration
```

## Design Philosophy

**Speed First**: Minimal clicks, keyboard-friendly, instant calculations

**Clarity**: Clean visual hierarchy, color-coded types, obvious KO indicators

**Competitive Focus**: Only essential inputs, usage-based defaults, no clutter

**Memory Aid**: Repeated use helps players internalize common damage ranges

## Future Enhancements

Potential additions for a full production version:
- Complete Pokémon database (1000+ Pokémon)
- Full move pool for each Pokémon
- EV/IV spread customization
- Nature selection
- Weather and terrain effects
- Critical hit calculations
- Multi-hit move support
- Import/export team configurations
- Usage statistics integration
- Keyboard shortcuts

## License

This is a demonstration project for educational purposes.
Pokémon and related properties are trademarks of Nintendo, Game Freak, and The Pokémon Company.

---

**Version**: 1.0.0  
**Built with**: React, TypeScript, Tailwind CSS
// Constants
const LEVEL = 50;

// Move data
const moveTypes = {
    "Flare Blitz": "Fire"
};

const moveTarget = {
    "Flare Blitz": "Physical"
};

const moveBP = {
    "Flare Blitz": 120
};

const moveModifiers = {
    "Flare Blitz": null
};

// Classes
class Moves {
    constructor(moveName) {
        this.name = moveName;
        this.typing = moveTypes[moveName];
        this.category = moveTarget[moveName];
        this.basePower = moveBP[moveName];
        this.modifiers = moveModifiers[moveName];
    }
}

class Spread {
    constructor(stats) {
        this.HP = stats.HP;
        this.Atk = stats.Atk;
        this.Def = stats.Def;
        this.SpA = stats.SpA;
        this.SpD = stats.SpD;
        this.Spe = stats.Spe;
    }

    static strToSpread(pasteStr, convertEVs = false) {
        const listOfAllocations = pasteStr.split(" / ");
        const baseStats = convertEVs ? 
            { HP: 0, Atk: 0, Def: 0, SpA: 0, SpD: 0, Spe: 0 } :
            { HP: 31, Atk: 31, Def: 31, SpA: 31, SpD: 31, Spe: 31 };
        
        const base = new Spread(baseStats);
        
        for (const allocation of listOfAllocations) {
            const [val, stat] = allocation.split(" ", 1);
            base[stat] = parseInt(val);
        }
        
        return base;
    }
}

class Paste {
    constructor(name, item, ability, tera, stats) {
        this.name = name;
        this.item = item;
        this.ability = ability;
        this.tera = tera;
        this.stats = stats;
    }
}

// Main damage calculation function
function calculateDamage(attackingPaste, defendingPaste, usedMove) {
    let atkBs = 0;
    let defBs = 0;
    
    const category = usedMove.category;
    if (category === "Physical") {
        atkBs = attackingPaste.stats.Atk;
        defBs = defendingPaste.stats.Def;
    } else if (category === "Special") {
        atkBs = attackingPaste.stats.SpA;
        defBs = defendingPaste.stats.SpD;
    }
    
    // Calculate base damage
    const baseDamageDone = ((((2 * LEVEL) / 5) + 2) * usedMove.basePower * (atkBs / defBs)) / 50 + 2;
    
    // Apply modifiers (currently just a 1.3x multiplier)
    const totalDamageDone = Math.floor(baseDamageDone * 1.3);
    
    return totalDamageDone;
}

// Function to update the output display
function updateDamageOutput() {
    const paste1 = new Paste(
        "Koraidon",
        "Life Orb",
        "Orichalcum Pulse",
        "Fire",
        new Spread({
            HP: 179,
            Atk: 178,
            Def: 141,
            SpA: 94,
            SpD: 121,
            Spe: 205
        })
    );

    const paste2 = new Paste(
        "Calyrex-Shadow",
        "Life Orb",
        "As One (Spectrier)",
        "Water",
        new Spread({
            HP: 179,
            Atk: 81,
            Def: 117,
            SpA: 193,
            SpD: 125,
            Spe: 222
        })
    );

    const flareBlitz = new Moves("Flare Blitz");
    const damage = calculateDamage(paste1, paste2, flareBlitz);
    
    // Update the output text
    const outputText = document.querySelector('.output-text');
    if (outputText) {
        outputText.textContent = `${Math.floor(damage*0.85)}-${damage}`;
    }
}

// Add event listener to the compute damage button
document.addEventListener('DOMContentLoaded', function() {
    const computeButton = document.querySelector('.compute-damage');
    if (computeButton) {
        computeButton.addEventListener('click', updateDamageOutput);
    }
});

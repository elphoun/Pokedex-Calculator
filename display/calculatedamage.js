// Constants
const LEVEL = 50;
const moveData = {
    "Thunderbolt": ["Electric", "S", 90]
};
const itemData = {
    "Light Ball": {atk: 2, def: 2}
};

class atkEVs {
    constructor(atk, spa) {
        this.atk = atk;
        this.spa = spa;
    }
}

class defEVs {
    constructor(hp, def, spd) {
        this.hp = hp;
        this.def = def;
        this.spd = spd;
    }
}

class Paste {
    constructor(item, ability, tera, stats, move) {
        this.item = item;
        this.ability = ability;
        this.tera = tera;
        this.stats = stats;
    }   
}

// calculateDamage(atkPaste, defPaste, atkMove) calculates the damage done
function calculateDamage(atkPaste, defPaste, atkMove) {
    let atkBS = 0;
    let defBS = 0;

    const moveInfo = moveData[atkMove];
    const category = "S";
    if (category === "P") {
        atkBS = atkPaste.stats.atk;
        defBS = defPaste.stats.def;
    } else {
        atkBS = atkPaste.stats.spa;
        defBS = defPaste.stats.spd;
    }
    const basePower = 90;
    const baseDamage = ((((2 * LEVEL) / 5) + 2) * basePower * (atkBS / defBS)) / 50 + 2;
    const totalDamage = Math.floor(baseDamage);
    console.log(totalDamage);
    return totalDamage;
}

// dealDamage() reads from the inputs and returns a string containing the damage roll
function dealDamage() {
    // get Attacker information
    const atk = document.querySelector(".ev-atk .ev-input").value;
    const spa = document.querySelector(".ev-spa .ev-input").value;
    const atkItem = document.querySelector(".item .item-select");
    const atkAbility = document.querySelector(".ability .ability-select");
    const atkTera = document.querySelector(".tera .tera-select");
    const atkPaste = new Paste (
        atkItem, 
        atkAbility, 
        atkTera, 
        new atkEVs ({atk, spa})
    );
    // get Defender information
    const hp = document.querySelector(".ev-hp .ev-input").value;
    const def = document.querySelector(".ev-def .ev-input").value;
    const spd = document.querySelector(".ev-spd .ev-input").value;
    const defItem = document.querySelector(".def-item .item-select").value;
    const defAbility = document.querySelector(".def-ability .ability-select").value;
    const defTera = document.querySelector(".def-tera .tera-select").value;
    const defPaste = new Paste (
        defItem, 
        defAbility, 
        defTera, 
        new defEVs ({hp, def, spd})
    );

    // compute damage
    const atkMove = document.querySelector(".move .move-select");
    const damage = calculateDamage(atkPaste, defPaste, atkMove);
    // get names and output damage done
    const atkName = document.querySelector(".atk .pokemon-sprites").alt;
    const defName = document.querySelector(".def .pokemon-sprites").alt;
    const outputText = document.querySelector(".damage-string");
    outputText.textContent = `${Math.floor(damage*0.85)}%-${damage}%`;
    const names = document.querySelector(".pokemon-names");
    names.textContent = `${atkName} VS ${defName}`;
}

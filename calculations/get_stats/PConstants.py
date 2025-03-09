LEVEL = 50

CALYREX_BP = {
        "HP": 100,
        "Atk": 80,
        "Def": 80,
        "SpA": 165,
        "SpD": 100,
        "Spe": 150
        }

KORAIDON_BP = {
        "HP": 100,
        "Atk": 135,
        "Def": 115,
        "SpA": 85,
        "SpD": 100,
        "Spe": 135
        }

BASE_STATS = {
        "Calyrex_Shadow": CALYREX_BP,
        "Koraidon": KORAIDON_BP
}

EVTEMPLATE = {"HP": 0,
            "Atk": 0,
            "Def": 0,
            "SpA": 0,
            "SpD": 0,
            "Spe": 0}

IVTEMPLATE = {"HP": 31,
            "Atk": 31,
            "Def": 31,
            "SpA": 31,
            "SpD": 31,
            "Spe": 31}

NATURE = {
    "Adamant": ("Atk", "SpA"),
    "Bashful": None,
    "Bold": ("Def", "Atk"),
    "Brave": ("Atk", "Spe"),
    "Calm": ("SpD", "Atk"),
    "Careful": ("SpD", "SpA"),
    "Docile": None,
    "Gentle": ("SpD", "Def"),
    "Hardy": None,
    "Hasty": ("Spe", "Def"),
    "Impish": ("Def", "SpA"),
    "Jolly": ("Spe", "SpA"),
    "Lax": ("Def", "SpD"),
    "Lonely": ("Atk", "Def"),
    "Mild": ("SpA", "Def"),
    "Modest": ("SpA", "Atk"),
    "Naive": ("Spe", "SpD"),
    "Naughty": ("Atk", "SpD"),
    "Quiet": ("SpA", "Spe"),
    "Quirky": None,
    "Rash": ("SpA", "SpD"),
    "Relaxed": ("Def", "Spe"),
    "Sassy": ("SpD", "Spe"),
    "Serious": None,
    "Timid": ("Spe", "Atk")
}

# For Testing ---------------------------------------------------------------------------------------------------
CALYREXPASTE = """Calyrex-Shadow @ Covert Cloak  
Ability: As One (Spectrier)  
Level: 50  
Tera Type: Grass  
EVs: 140 HP / 4 Def / 100 SpA / 12 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Astral Barrage  
- Psyshock  
- Nasty Plot  
- Protect"""

KORAIDONPASTE = """Koraidon @ Life Orb  
Ability: Orichalcum Pulse  
Level: 50  
Tera Type: Fire  
EVs: 28 HP / 180 Atk / 44 Def / 4 SpD / 252 Spe  
Jolly Nature  
- Flare Blitz  
- Close Combat  
- U-turn  
- Protect"""
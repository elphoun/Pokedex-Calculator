LEVEL = 50

STATS = {"HP": 100,
         "Atk": 80,
         "Def": 80,
         "SpA": 165,
         "SpD": 100,
         "Spe": 150}

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
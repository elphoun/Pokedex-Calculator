# -----------------------------------------------------------------------------
class Moves:
    """
    A class used to represent a Move
    
    Attributes:
        name (str): A string containing the name of the move
        typing (str): A string containing the Pokemon's type
        category (str): A string containing one of Physical, Special, or Status
        base_power (int, NULL): An int containing the move's base power. NULL if no modifiers or non-permanant base power (i.e. Heavy Slam)
        modifiers (dict[str] = Bool, NULL): A dictionary containing the list of potential modifiers for the move. NULL if no modifiers
    """
    def __init__(move, move_name):
        move.name = move_name
        move.typing = move_types[move_name]
        move.category = move_target[move_name]
        move.base_power = move_bp[move_name]
        move.modifiers = move_modifiers[move_name]
        
move_types = {
    "Flare Blitz": "Fire"
}

move_target = {
    "Flare Blitz": "Physical"
}

move_bp = {
    "Flare Blitz": 120
}
        
move_modifiers = {
    "Flare Blitz": None
}


# -----------------------------------------------------------------------------
class Spread:
    """
    A class used to represent a Pokemon's stat spread. Spreads can be initalized 
    using a dictionary that contains ["HP", "Atk", "Def", "SpA", "SpD", "Spe"] as 
    its keys.
    
    Attributes:
        HP (int): An int representing the pokemon's total HP
        Atk (int): An int representing the pokemon's attack stat
        Def (int): An int representing the pokemon's defense stat
        SpA (int): An int representing the pokemon's special attack stat
        SpD (int): An int representing the pokemon's special defense stat
        Spe (int): An int representing the pokemon's speed stat
    """
    def __init__(stats, spread):
        stats.HP = spread["HP"]
        stats.Atk = spread["Atk"]
        stats.Def = spread["Def"]
        stats.SpA = spread["SpA"]
        stats.SpD = spread["SpD"]
        stats.Spe = spread["Spe"]
    
    # define constants for EV and IV spreads
    
    def str_to_spread(paste_str, convert_EVs = False):
        """
        A function used to convert a pokepaste string containing the Pokemon's
        EV/IV spread into a Spread
        
        Parameters:
            paste_str (str): A string representing the allocation of stats
            convert_EVs (bool): A boolean that represents whether or not the
                                function is converting EVs
        
        Returns:
            Spread: A Spread containing the stats detailed in paste_str
        """
        list_of_allocations = paste_str.split(" / ")
        base = Spread({"HP": 31,
                       "Atk": 31,
                       "Def": 31,
                       "SpA": 31,
                       "SpD": 31,
                       "Spe": 31})
        
        if convert_EVs:
            base = Spread({"HP": 0,
                            "Atk": 0,
                            "Def": 0,
                            "SpA": 0,
                            "SpD": 0,
                            "Spe": 0})
            
        for allocation in list_of_allocations:
            val, stat = allocation.split(" ", 1)
            setattr(base, stat, val)
        
        return base
        
        

# -----------------------------------------------------------------------------
class Paste:
    """
    A class used to represent a pokepaste
    
    Attributes: 
        name (str): A string containing the Pokemon's name
        item (str): A string containing the Pokemon's item
        ability (str): A string containing the Pokemon's ability
        tera (str): A string containing the Pokemon's teratype
        stats (Spread): A dictionary containing a Pokemon's stat spread.
    """
    def __init__(paste, name, item, ability, tera, stats):
       paste.name = name
       paste.item = item
       paste.ability = ability
       paste.tera = tera
       paste.stats = stats
       
    
       

from re import MULTILINE, findall
from math import floor
from PConstants import BASE_STATS, LEVEL, EVTEMPLATE, IVTEMPLATE, NATURE
import sys
sys.path.insert(0, r"C:\Users\kalem\OneDrive\Desktop\Calculator\calculations")
from DataTypes import Paste, Moves, Spread

def digest_paste(raw_paste) -> Paste:
    """
    A function that changes the pokepaste into the Paste class
    
    Parameters:
        raw_paste (str): Contains the raw paste for the pokemon
        
    Returns:
        Paste: Returns the processed Paste
    """
    name, item, ability, tera_type, nature, EVs, IVs = ""
    
    lines: str = raw_paste.split("\n")
    for line in lines:
        if "@" in line:
            raw_name, item = line.rsplit(" @ ", 1)
            name = findall(r"^(.+?) \(", raw_name, MULTILINE)
            if not name:
                name = raw_name
        elif (":" in line) and not line.startswith(("Level:", "Shiny:", "Gender:")):
            category, val = line.rsplit(": ", 1)
            match category:
                case "Ability":
                    ability = val
                case "Tera Type":
                    tera_type = val
                case "EVs":
                    EVs = val
                case "IVs":
                    IVs = val
        elif "Nature" in line:
            nature = val
            
    # str->Spread
    ev_spread = Spread.str_to_spread(EVs, True)
    iv_spread = Spread.str_to_spread(IVs)
    nature_list = NATURE(nature)
    pokemon_bp = BASE_STATS(name)
    
    # create base stats
    new_spread = stats(pokemon_bp, ev_spread, iv_spread, nature_list)
    
    # new_paste
    new_paste = Paste(name, item, ability, tera_type, new_spread)
    return new_paste
            


# Calculating Stats ------------------------------------------------------------------------------------------------------------------------------
def stats(base_stats, EVs, IVs, nature_list):
    """
    A function that converts the base stats, evs, ivs, and nature of a pokemon into its actual stats.
    
    Parameters:
        base_stats (Spread): A Spread containing the base stats of each pokemon
        EVs (Spread): A Spread containing the EVs of the pokemon
        IVs (Spread): A Spread containing the IVs of the pokemon
        nature_list (list): A list containing the stats that the Pokemon's nature will influence
        
    Returns:
        Spread: final stats of the pokemon
    """
    dict_of_stats = base_stats.__dict__
    list_of_stats = dict_of_stats.keys()
    for stat in list_of_stats:
        base_stat = dict_of_stats[stat]
        stats_ev = getattr(EVs, stat)
        stats_iv = getattr(IVs, stat)
        stat_is_HP = (stat == "HP")
        stat_boost = (stat == nature_list[0])
        stat_reduce = (stat == nature_list[1])
        new_stat = get_stat(base_stat, stats_ev, stats_iv, 
                            stat_boost, stat_reduce, stat_is_HP)
        setattr(base_stats, stat, new_stat)
    return base_stats
        
        
def get_stat(stat, EV, IV, stat_boost, stat_reduce, is_HP):
    """
    A function that converts the base stat into the actual stat
    
    Parameters:
        stat (int): The base stat for the given stat
        EV (int): The amount of EVs invested into the given stat
        IV (int): The IV of the stat
        stat_boost (bool): True if the stat is boosted by the nature, false otherwise
        stat_reduce (bool): False if the stat is lowered by the nature, false otherwise
        is_HP (bool): True if the stat is HP, false otherwise
    
    Returns:
        Spread: A Spread with the correct final stats
    """
    final_stat = floor(
        (2 * stat + IV + floor(EV / 4) * LEVEL) / 100
    )
    
    if is_HP:
        final_stat += LEVEL + 10
    elif stat_boost:
        final_stat = (final_stat + 5) * 1.1
    elif stat_reduce:
        final_stat = (final_stat + 5) * 0.9
    else:
        final_stat += 5
    
    return final_stat


from math import floor
import sys
sys.path.insert(0, r"C:\Users\kalem\OneDrive\Desktop\Calculator\calculations")
from DataTypes import Paste, Moves, Spread
from Constants import LEVEL, NATURES

def calculate_damage(attacking_paste: Paste, defending_paste: Paste, used_move: Moves):
    """
    A function that calculates the damage done by the attacking_paste to the defending_paste using attacking_move
    
    Parameters:
        attacking_paste (Paste): Contains the Paste for the attacking pokemon
        defending_paste (Paste): Contains the Paste for the defending pokemon
        attacking_move (str): Contains the move used by the attacking pokemon
        
    Returns:
        int: Returns the total damage done by the move
    """
    
    # Determine which Stats to use (make sure to account for damage dealing status moves like Pain Split)
    atk_bs: int = 0
    def_bs: int = 0
    
    category = used_move.category
    if category == "Physical":
        atk_bs = (attacking_paste.stats).Atk
        def_bs = (defending_paste.stats).Def
    elif category == "Special":
        atk_bs = attacking_paste.stats["SpA"]
        def_bs = defending_paste.stats["SpD"]
    
    # calculate base damage
    base_damage_done = ((((2 * LEVEL) / 5) + 2) * used_move.base_power * (atk_bs / def_bs)) / 50 + 2
    
    # apply modifiers
    total_damage_done = floor(base_damage_done * 1.3)    # should be list of modifiers
    
    # determine total damage done
    return total_damage_done


def main():
    paste1 = Paste(
        "Koraidon",
        "Life Orb",
        "Orichalcum Pulse",
        "Fire",
        Spread({"HP": 179, "Atk": 178, "Def": 141, "SpA": 94, "SpD": 121, "Spe": 205})
    )
    paste2 = Paste(
        "Calyrex-Shadow",
        "Life Orb",
        "As One (Spectrier)",
        "Water",
        Spread({"HP": 179, "Atk": 81, "Def": 117, "SpA": 193, "SpD": 125, "Spe": 222})
    )
    flare_blitz = Moves("Flare Blitz")
    print(calculate_damage(paste1, paste2, flare_blitz))
    
main()

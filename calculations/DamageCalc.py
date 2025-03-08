
from DataTypes import Paste, Moves  # Maybe Include Spread
from Constants import LEVEL, NATURES


def calculate_damage(attacking_paste: Paste, defending_paste: Paste, attacking_move: Moves):
    """
    A function that calculates the damage done by the attacking_paste to the defending_paste using attacking_move
    
    Parameters:
        attacking_paste (Paste): Contains the Paste for the attacking pokemon
        defending_paste (Paste): Contains the Paste for the defending pokemon
        attacking_move (str): Contains the move used by the attacking pokemon
        
    Returns
        int: Returns the total damage done by the move
    """    

    # Get move info
        # base power
        # stat (physical, special)
        # typing
        # other potential modifiers
    
    
    
    # calculate base damage
    base_damage_done = ((((2 * LEVEL) / 5) + 2) * base_power * (offense / defense)) / 50
    
    # apply modifiers
    total_damage_done = base_damage_done * 1    # should be list of modifiers
    
    # determine total damage done
    return total_damage_done
    
    
    
    
"""
Outputs a dictionary containing a Pokemon's stat spread
"""
def get_Stats(self):
    EVs: dict = Paste.EVs
    IVs: dict = Paste.IVs
    nature: str = NATURES(Paste.nature)
    stat_spread = {}
    for stat in EVs.keys():
        hp_stat = (stat == "HP")
        pos_nature = stat == nature[0]
        neg_nature = stat == nature[1]
        EV_yield = EVs[stat] // 4
        stat_value = (2 * stat + IVs[stat] + EV_yield) * LEVEL // 100 
        stat_spread.update({
            stat:
                (stat_value +
                (5 * (hp_stat + 11))) *
                (1.1 * pos_nature) *
                (0.9 * neg_nature)})
    return stat_spread
    
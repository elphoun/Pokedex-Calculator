class Paste:
    """
    A class used to represent a pokepaste
    
    Attributes
    -------------
    name: str
        A string containing the Pokemon's name
    item: str
        A string containing the Pokemon's item
    ability: str
        A string containing the Pokemon's ability
    tera: str
        A string containing the Pokemon's teratype
    EVs: dict[str] = int
        A dictionary containing a Pokemon's EV spread. 'str' contains the name of the stat. 'int' contains the EVs allocated to that stat
        By default, the values should be 0
    IVs: dict[str] = int
        A dictionary containing a Pokemon's IV spread. 'str' contains the name of the stat. 'int' contains the pokemon's IV stat
        By default, the values should be 31
    nature: str
        A string containg the Pokemon's nature
    """
    def __init__(self, name, item, ability, tera, EVs, IVs, nature):
       Paste.name = name
       Paste.item = item
       Paste.ability = ability
       Paste.tera = tera
       Paste.EVs = EVs
       Paste.IVs = IVs
       Paste.nature = nature 

class Moves:
    """
    A class used to represent a Move
    
    Attributes
    -------------
    move_name: str
        A string containing the name of the move
    modifiers: dict[str] = Bool
        A dictionary containing the list of potential modifiers for the move.
    """
    def __init__(self, move_name, modifiers):
        move_name = Moves.move_name
        modifiers = Moves.modifiers
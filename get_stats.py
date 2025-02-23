
import math
import PConstants

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

DESIREDOUTPUT = {'name': 'Calyrex-Shadow', 
                 'item': 'Covert Cloak', 
                 'Ability': 'As One (Spectrier)', 
                 'Tera Type': 'Grass', 
                 'EVs': {'HP': '140', 
                         'Atk': 0, 
                         'Def': '4', 
                         'SpA': '100', 
                         'SpD': '12', 
                         'Spe': '252'}, 
                 'nature': 'Timid', 
                 'IVs': {'HP': 31, 
                         'Atk': '0', 
                         'Def': 31, 
                         'SpA': 31, 
                         'SpD': 31, 
                         'Spe': 31}, 
                 'moves': ['Astral Barrage', 
                           'Psyshock', 
                           'Nasty Plot', 
                           'Protect']}

#  GetRelevantInfo(paste) digests the paste. 
def GetRelevantInfo(paste) -> dict:
    finalpaste = {}
    important = list(filter(lambda x: not(x.startswith(("Level:", "Gender:", "Shiny: "))), paste.splitlines()))
    important = list(map(lambda x: x.strip().strip("- "), important))
    for line in important:
        if "@" in line:
            name, item = line.split(" @ ")
            finalpaste.update({"name": name, "item": item})
        elif ":" in line:
            tag, data = line.split(": ")
            if tag in ("EVs", "IVs"):
                listofStats = data.split(" / ")
                stats = PConstants.EVTEMPLATE if tag == "EVs" else PConstants.IVTEMPLATE
                for i in listofStats:
                    evval, evtag = i.split(" ")
                    stats.update({evtag: evval})
                    data = stats
            finalpaste.update({tag: data})
        elif "Nature" in line:
            nature = line.partition(" Nature")[0]
            finalpaste.update({"nature": nature})
        elif "moves" in finalpaste.keys():
            finalpaste["moves"].append(line)
        else:
            finalpaste.update({"moves": [line]})
    return finalpaste

def Stats(stats, paste):
    FinalStats = PConstants.EVTEMPLATE
    CalyrexStats = stats
    CalyrexEVs = GetRelevantInfo(paste)["EVs"]
    CalyrexIVs = GetRelevantInfo(paste)["IVs"]
    CalyrexNature = PConstants.NATURE[GetRelevantInfo(paste)["nature"]]
    for i in FinalStats.keys():
        if i == "HP":
            FinalStats.update({i: HPCalc(int(CalyrexStats[i]), int(CalyrexIVs[i]), int(CalyrexEVs[i]))})
        elif i == CalyrexNature[0]:
            FinalStats.update({i: math.floor(ElseCalc(int(CalyrexStats[i]), int(CalyrexIVs[i]), int(CalyrexEVs[i])) * 1.1)})
        elif i == CalyrexNature[1]:
            FinalStats.update({i: math.floor(ElseCalc(int(CalyrexStats[i]), int(CalyrexIVs[i]), int(CalyrexEVs[i])))})
        else:
            FinalStats.update({i: ElseCalc(int(CalyrexStats[i]), int(CalyrexIVs[i]), int(CalyrexEVs[i]))})
    return FinalStats
                
def HPCalc(stat, IV, EV):
    EVyield = EV//4
    HPStat = (2 * stat + IV + EVyield) * PConstants.LEVEL // 100 
    return HPStat + PConstants.LEVEL + 10

def ElseCalc(stat, IV, EV):
    EVyield = EV//4
    ElseStat = (2 * stat + IV + EVyield) * PConstants.LEVEL // 100
    return ElseStat + 5

print(GetRelevantInfo(CALYREXPASTE))

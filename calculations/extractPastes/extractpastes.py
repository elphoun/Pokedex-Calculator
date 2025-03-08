import requests
from bs4 import BeautifulSoup

def LoopPastes():
    for _ in PokemonData():
        print(_)

def CheckLink():
    while True: 
        try: 
            return ValidPaste(input("Input a Link: "))
        except Exception:
            print("Error. Invalid URL")
            pass
            
def ValidPaste(link: str) -> BeautifulSoup:
    if link.startswith("https://pokepast.es/"):
        link = requests.get(link)
        return BeautifulSoup(link.text, "html.parser")
    else:
        raise Exception()


def PokemonData():
    html = CheckLink()
    pokedata = list(map(lambda x: x.get_text().strip(), html))
    pokedata = list(map(lambda x: GetRelevantInfo(x), pokedata))
    return pokedata
            

def GetRelevantInfo(paste: str) -> dict:
    finalpaste = {}
    important = list(filter(lambda x: not(x.startswith(("Level:", "Gender:", "Shiny: "))), paste.splitlines()))
    important = list(map(lambda x: x.strip().strip("- "), important))
    for line in important:
        if "@" in line:
            name, item = line.split(" @ ")
            finalpaste.update({"name": name, "item": item})
        elif ":" in line:
            tag, data = line.split(": ")
            finalpaste.update({tag: data})
        elif "Nature" in line:
            nature = line.partition(" Nature")[0]
            finalpaste.update({"nature": nature})
        elif "moves" in finalpaste.keys():
            finalpaste["moves"].append(line)
        else:
            finalpaste.update({"moves": [line]})
    return finalpaste

print(GetRelevantInfo("https://pokepast.es/2cfc5c0495917f7e"))

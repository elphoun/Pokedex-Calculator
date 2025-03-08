import requests
import pandas as pd
from bs4 import BeautifulSoup

# Extracts the Google Sheets page and a list containing every Pokemon
def main():
    sheet_name = "RegulationG"
    sheet_id = "1BqqanREI9aUTYy4uXXQqbYe0R8twR27FGb0nrLlvClk"
    sheet_api_link = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"
    listofPastes = getPastes(sheet_api_link)
    
    decomposedPastes = list(map(lambda paste: GetPasteInfo(paste), listofPastes))
    
    print(decomposedPastes)
    
# Extracts the Pastes from Google Sheets
def getPastes(link: str) -> list[str]:
    sheet_info = pd.read_csv(link)
    pastes_with_EVs = sheet_info.loc[sheet_info["EVs?"] == "Yes"]
    return list(pastes_with_EVs["Pastes"])

if __name__ == "__main__":
    main()    

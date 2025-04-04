const defresultsBox = document.querySelector(".def-results");
const definputBox = document.getElementById("def-input-box");

definputBox.onkeyup = function(){
    let result = [];
    let input = definputBox.value;
    if (input.length) {
        result = pokemonKanto.filter((keyword)=>{
                return keyword.toLowerCase().includes(input.toLowerCase());
            });
        console.log(result);
    }
    defdisplay(result);

    if (!result.length) {
        defresultsBox.innerHTML = "";
    }
}

function defdisplay(result) {
    const content = result.map((list)=>{
        return "<li onclick=defselectInput(this)>" + list + "</li>";
    });
    defresultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function defselectInput(list) {
    definputBox.value = list.innerHTML;
    defresultsBox.innerHTML = "";

    const searchValue = definputBox.value.toLowerCase().trim();
    const pokemonImage = document.getElementById('def-sprite');
    const pokemonNumber = pokemonNames[searchValue];
    if (pokemonNumber) {
        pokemonImage.src = `sprites/pokemon/${pokemonNumber}.png`;
        pokemonImage.alt = searchValue;
    } else {
        pokemonImage.src = 'sprites/pokemon/substitute.png';
        pokemonImage.alt = 'Pokemon not found';
    }
}
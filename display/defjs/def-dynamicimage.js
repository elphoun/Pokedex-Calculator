document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('def-input-box');
    const pokemonImage = document.getElementById('def-sprite');
    const resultsDiv = document.querySelector('.search-bar-def .results');

    // Set default image to substitute.png
    pokemonImage.src = 'sprites/pokemon/substitute.png';
    pokemonImage.alt = 'Substitute';

    // Function to update the image based on search input
    function updatePokemonImage() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const searchTerm = pokemonNames[searchValue] || searchValue;
        pokemonImage.src = `sprites/pokemon/${searchTerm}.png`;
        pokemonImage.alt = searchTerm;
        pokemonImage.onerror = () => {
            pokemonImage.src = 'sprites/pokemon/substitute.png';
            pokemonImage.alt = 'Pokemon not found';
        };
    }

    // Add event listener for Enter key
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            updatePokemonImage();
            if (resultsDiv) {
                resultsDiv.innerHTML = '';
            }
        }
    });

    // Initial update
    updatePokemonImage();
});

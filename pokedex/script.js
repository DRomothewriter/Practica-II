
import Pokemon from './pokemon.js';

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const pokedex = document.getElementById("pokedex");
const pagination = document.getElementById("pagination");

let limit = 12;
let offset = 0;

async function loadPokedex() {
    try {
        pokedex.innerHTML = ""; // Limpiar contenido al cambiar de página
        const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        for (const pokemon of data.results) {
            await loadPokemonDetails(pokemon.url);
        }
    } catch (error) {
        console.error("Error in loadPokedex: ", error);
    }
}

async function loadPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokenObj = new Pokemon(data);
        pokedex.appendChild(pokenObj.renderCard());
    } catch (error) {
        console.error("Error in loadPokemonDetails: ", error);
    }
}

function changePage(direction) {
    if (direction === "next") {
        offset += limit;
    } else if (direction === "prev" && offset > 0) {
        offset -= limit;
    }
    loadPokedex();
}

document.getElementById("prevPage").addEventListener("click", () => changePage("prev"));
document.getElementById("nextPage").addEventListener("click", () => changePage("next"));

loadPokedex();


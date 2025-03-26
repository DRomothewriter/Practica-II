class Pokemon {
    constructor({id, name, types, sprites})
    {
        this.id = id;
        this.name = name;
        this .types =types;
        this.image = sprites.front_default;
    }
    renderCard()
    {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
        `;//Aqui ponemos el html con bootstrap para hacer la carta  y en src le ponemos "this.image"
        return card;

    }
}
const API_URL = "https://pokeapi.co/api/v2/pokemon";

async function loadPokedex()
{
    try{
        const response = await fetch(API_URL);
        const data = response.json();
        for(const pokemon of data.result)
        {
            loadPokemonDetails(pokemon);
        }
    }
    catch(error)
    {
        console.error("Error in loadPokedex: ",error);
    }
}

async function loadPokemonDetails(url)
{
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokenObj = new Pokemon(data);
        pokedex.appendChild(pokenObj.renderCard());
    }
    catch (error) {
        console.error("Error in loadPokemonDetails: ", error)
    }
}
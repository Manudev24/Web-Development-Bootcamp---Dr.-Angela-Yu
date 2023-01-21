const express = require('express');
const https = require('https');
const app = express();
function imageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`;
}

app.get('/', (req, res) => {
    const limit = 200;
    apiPokemon = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    https.get(apiPokemon, (response) => {
        let result = '';
        response.on("data", (data) => {
            result += data;
        });
        response.on('end', () => {
            const pokemonList = JSON.parse(result);
            const pokemones = pokemonList.results;
            console.log(pokemonList);
            for (let i = 0; i < limit; i++) {
                res.write(`<h1>${pokemones[i].name}</h1>`);
                res.write(`<img src=${imageUrl(i)}>`)
            }
        })
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
});
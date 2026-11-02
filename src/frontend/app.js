"use strict";
const input = document.getElementById('userInput');
const button = document.getElementById('sendBtn');
const bonkdog = {
    hp: 100,
    attack: 150,
    defence: 75,
    special_attack: 50,
    special_defence: 70,
    speed: 100,
};
async function fetch_pokemon(pokemon_name) {
    try {
        const response = await fetch(`http://localhost:3000/test/${pokemon_name}`);
        const pokemon = await response.json();
        console.log('Data get:', pokemon);
        // crude ahh validity check
        if (pokemon.id != undefined) {
            display_pokemon_info(pokemon);
            display_bonk_info();
            display_pokemon_img(pokemon);
            display_bonk_img();
        }
        else {
            alert("something has gone wrong terribly, you are to blame (wrong name prolly lol)");
        }
    }
    catch (error) {
        console.error('front shit itself:', error);
    }
}
async function display_pokemon_info(pokemon) {
    document.getElementById('pokemonchosen').textContent = 'you have chosen: ' + pokemon.name;
    document.getElementById('pokehp').textContent = 'hp: ' + pokemon.stats[0].base_stat;
    document.getElementById('pokeattack').textContent = 'attack: ' + pokemon.stats[1].base_stat;
    document.getElementById('pokedefence').textContent = 'defence: ' + pokemon.stats[2].base_stat;
    document.getElementById('pokespecialattack').textContent = 'special attack: ' + pokemon.stats[3].base_stat;
    document.getElementById('pokespecialdefence').textContent = 'special defence: ' + pokemon.stats[4].base_stat;
    document.getElementById('pokespeed').textContent = 'speed: ' + pokemon.stats[5].base_stat;
}
async function display_bonk_info() {
    document.getElementById('bonkchosen').textContent = 'your opponent chooses: BONKDOG';
    document.getElementById('bonkhp').textContent = 'hp: ' + bonkdog.hp.toString();
    document.getElementById('bonkattack').textContent = 'attack: ' + bonkdog.attack.toString();
    document.getElementById('bonkdefence').textContent = 'defence: ' + bonkdog.defence.toString();
    document.getElementById('bonkspecialattack').textContent = 'special attack: ' + bonkdog.special_attack.toString();
    document.getElementById('bonkspecialdefence').textContent = 'special defence: ' + bonkdog.special_defence.toString();
    document.getElementById('bonkspeed').textContent = 'speed: ' + bonkdog.speed.toString();
}
async function display_pokemon_img(pokemon) {
    const imgElement = document.getElementById('pokeimage');
    const artwork = pokemon.sprites.other['official-artwork'].front_default;
    // make visible
    imgElement.style.display = 'block';
    imgElement.src = artwork;
}
async function display_bonk_img() {
    const imgElement = document.getElementById('bonkimage');
    // make visible
    imgElement.style.display = 'block';
    imgElement.src = '../content/bonkdog.png';
}
button?.addEventListener('click', () => {
    const pokemonName = input.value;
    if (pokemonName) {
        fetch_pokemon(pokemonName);
    }
    else {
        alert('try typing something dumbass');
    }
});

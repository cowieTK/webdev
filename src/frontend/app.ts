const input = document.getElementById('userInput') as HTMLInputElement;
const button = document.getElementById('sendBtn');

async function fetch_pokemon(pokemon_name: string) {

    try {

        const pokeresponse = await fetch(`http://localhost:3000/test/${pokemon_name}`);
        const pokemon = await pokeresponse.json();
        console.log('poke get:', pokemon); 

        const bonkresponse = await fetch(`http://localhost:3000/getdog`);
        const bonkdog = await bonkresponse.json();
        console.log('bonk get: ', bonkdog);

        // crude ahh validity check
        if (pokemon.id != undefined) {
            display_pokemon_info(pokemon);
            update_bonkdog(bonkdog, pokemon);
            display_bonk_info(bonkdog);
            display_pokemon_img(pokemon);
            display_bonk_img(bonkdog);
        } else {
            alert("something has gone wrong terribly, you are to blame (wrong name prolly lol)");
        }
        

    } catch (error) {
        console.error('front shit itself:', error);
    }
}

async function update_bonkdog(bonkdog: any, pokemon: any){

    let types = pokemon.types;

    for (const type of types) {
        if (type.type.name == 'grass') {
            bonkdog.fired_up = true;
            break;
        } else {
            bonkdog.fired_up = false;
        }
        if (type.type.name == 'fire') {
            bonkdog.iced_up = true;
            break;
        } else {
            bonkdog.iced_up = false;
        }
    }
}

async function display_pokemon_info(pokemon: any) {
    
    document.getElementById('pokemonchosen')!.textContent = 'you have chosen: ' + pokemon.name;
    document.getElementById('pokehp')!.textContent = 'hp: ' + pokemon.stats[0].base_stat;
    document.getElementById('pokeattack')!.textContent = 'attack: ' + pokemon.stats[1].base_stat;
    document.getElementById('pokedefence')!.textContent = 'defence: ' + pokemon.stats[2].base_stat;
    document.getElementById('pokespecialattack')!.textContent = 'special attack: ' + pokemon.stats[3].base_stat;
    document.getElementById('pokespecialdefence')!.textContent = 'special defence: ' + pokemon.stats[4].base_stat;
    document.getElementById('pokespeed')!.textContent = 'speed: ' + pokemon.stats[5].base_stat;

}

async function display_bonk_info(bonkdog: any) {

    if (bonkdog.fired_up) {
        document.getElementById('bonkchosen')!.textContent = 'your opponent chooses: BONKDOG (FIRE TYPE)';
    } else if (bonkdog.iced_up) {
        document.getElementById('bonkchosen')!.textContent = 'your opponent chooses: BONKDOG (ICE TYPE, very chill)';
    } else {
        document.getElementById('bonkchosen')!.textContent = 'your opponent chooses: BONKDOG';
    }

    document.getElementById('bonkhp')!.textContent = 'hp: ' + bonkdog.hp.toString();
    document.getElementById('bonkattack')!.textContent = 'attack: ' + bonkdog.attack.toString();
    document.getElementById('bonkdefence')!.textContent = 'defence: ' + bonkdog.defence.toString();
    document.getElementById('bonkspecialattack')!.textContent = 'special attack: ' + bonkdog.special_attack.toString();
    document.getElementById('bonkspecialdefence')!.textContent = 'special defence: ' + bonkdog.special_defence.toString();
    document.getElementById('bonkspeed')!.textContent = 'speed: ' + bonkdog.speed.toString();

}

async function display_pokemon_img(pokemon: any) {
    const imgElement = document.getElementById('pokeimage') as HTMLImageElement;
    const artwork = pokemon.sprites.other['official-artwork'].front_default;
    // make visible
    imgElement.style.display = 'block';
    imgElement.src = artwork 
}

async function display_bonk_img(bonkdog: any) {
    const imgElement = document.getElementById('bonkimage') as HTMLImageElement;
    // make visible
    imgElement.style.display = 'block';
    if (bonkdog.fired_up) {
        imgElement.src = '../content/bonkdog_fire.png';
    } else if (bonkdog.iced_up) {
        imgElement.src = '../content/bonkdog_ice.png';
    } else  {
        imgElement.src = '../content/bonkdog.png';
    }
    
}

button?.addEventListener('click', () => {

    const pokemonName = input.value;
    if (pokemonName) {
        fetch_pokemon(pokemonName);
    } else {
        alert('try typing something dumbass');
    }
});

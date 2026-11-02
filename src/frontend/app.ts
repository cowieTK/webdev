const input = document.getElementById('userInput') as HTMLInputElement;
const button = document.getElementById('sendBtn');


async function fetch_pokemon(pokemon_name: string) {

    try {

        const response = await fetch(`http://localhost:3000/test/${pokemon_name}`);
        const data = await response.json();
        console.log('Data get:', data); 

        // crude ahh validity check
        if (data.id != undefined) {
            document.getElementById('display')!.textContent = data.id + " " + data.name;
        } else {
            alert("something has gone wrong terribly, you are to blame (wrong name prolly lol)");
        }
        

    } catch (error) {
        console.error('front shit itself:', error);
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

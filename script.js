let firstPokemon = prompt(
    "Elige al primer pokemon para batallar: Bulbasaur, Charmander, Squirtle, Pikachu, Onix"
);
let secondPokemon = prompt(
    "Elige al segundo pokemon para batallar: Bulbasaur, Charmander, Squirtle, Pikachu, Onix"
);

let pokemonBlue = {};
let pokemonRed = {};

let firstPokemonDOM = document.querySelector('#first-pokemon-selected');
let secondPokemonDOM = document.querySelector('#second-pokemon-selected');

let pokemonBattleDOM = document.querySelector('#pokemon-battle');
let pokemonWinnerDOM = document.querySelector('#pokemon-winner');

// Se buscan al pokemon para definir los datos y estadísticas.
const getPokemonStats = (pokemon, stats) => {
    switch (pokemon.toLowerCase()) {
        case "bulbasaur":
            stats.name = "Bulbasaur";
            stats.image = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'
            stats.type = "grass";
            stats.debilityType = "fire";
            stats.healthPoints = 45;
            stats.attackPoints = 49;
            stats.attackName = "Látigo Sepa";
            break;
        case "charmander":
            stats.name = "Charmander";
            stats.image = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'
            stats.type = "fire";
            stats.debilityType = "water";
            stats.healthPoints = 39;
            stats.attackPoints = 52;
            stats.attackName = "lanza llamas";
            break;
        case "squirtle":
            stats.name = "Squirtle";
            stats.image = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'
            stats.type = "water";
            stats.debilityType = "electric";
            stats.healthPoints = 44;
            stats.attackPoints = 48;
            stats.attackName = "Chorro de Agua";
            break;
        case "pikachu":
            stats.name = "Pikachu";
            stats.image = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'
            stats.type = "electric";
            stats.debilityType = "ground";
            stats.healthPoints = 35;
            stats.attackPoints = 55;
            stats.attackName = "Impactrueno";
            break;
        case "onix":
            stats.name = "Onix";
            stats.image = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/095.png'
            stats.type = "ground";
            stats.debilityType = "Water";
            stats.healthPoints = 35;
            stats.attackPoints = 45;
            stats.attackName = "Cabeza roca";
            break;
        default:
            alert("Escoge un pokemon de la lista");
            break;
    }
};

// Set Dom data of the pokemon
const setDomPokemon = (pokemon, dom) => {
    let img = dom.querySelector('.pokemon-img');
    img.src = pokemon.image;
    img.alt = pokemon.name;

    let name = dom.querySelector('.pokemon-name');
    name.innerText = pokemon.name;
}

// Proceso de ataque de cada pokemon
const pokemonBattleProcess = (attack, defense) => {
    console.log(`Es el turno de ${attack.name}`);
    pokemonBattleDOM.innerHTML += `<p class="${attack.type}">Es el turno de ${attack.name}</p>`;
    // Primer pokemon ataca, se calcula el daño que puede recibir el segundo pokemon
    const powerAttack = getRandomIntInclusive(1, 20);
    let totalPowerToAttack =
        powerAttack === 20
            ? attack.attackPoints
            : (attack.attackPoints * powerAttack) / 100;
    totalPowerToAttack = Math.round(totalPowerToAttack);
    // Si el tipo del pokemon atacante es fuerte contra el tipo del pokemon que defiende, su ataque se multiplica por 2, 
    // pero si es débil contra el tipo del pokemon que defiende, su ataque se divide entre 2 
    if(attack.type === defense.debilityType) {
        totalPowerToAttack *= 2
    } else if(attack.debilityType === defense.type){
        totalPowerToAttack /= 2
    }
    console.log(`${attack.name} ataca con ${attack.attackName}`);
    pokemonBattleDOM.innerHTML += `<p class="${attack.type}">${attack.name} ataca con ${attack.attackName}</p>`;

    // Se valida si el ataque acertó o fallo
    const salvation = getRandomIntInclusive(0, 1);
    if (salvation === 1) {
        console.log(
            `El ataque de ${attack.name} ha fallado!!! ${attack.name} pudo esquivar el ataque`
        );
        pokemonBattleDOM.innerHTML += `<p class="${attack.type}">El ataque de ${attack.name} ha fallado!!! ${attack.name} pudo esquivar el ataque</p>`;
    } else {
        if (totalPowerToAttack > defense.healthPoints) {
            defense.healthPoints = 0;
            console.log(`Es un golpe critico!!!!`);
            pokemonBattleDOM.innerHTML += `<p class="${attack.type}">Es un golpe critico!!!!</p>`;
        } else {
            defense.healthPoints -= totalPowerToAttack;
            console.log(`El ataque de ${attack.name} ha dado en el blanco!!!`);
            pokemonBattleDOM.innerHTML += `<p class="${attack.type}">El ataque de ${attack.name} ha dado en el blanco!!!</p>`;
        }
        console.log(`A ${defense.name} le quedan ${Math.round(defense.healthPoints)} puntos de salud`);
        console.log(`Ha terminado el turno de ${attack.name}`)
        pokemonBattleDOM.innerHTML += `<p class="${attack.type}">A ${defense.name} le quedan ${Math.round(defense.healthPoints)} puntos de salud</p>`;
        pokemonBattleDOM.innerHTML += `<p class="${attack.type}">Ha terminado el turno de ${attack.name}</p>`;
    }
};

// Función para la batalla pokemon
const pokemonBattle = (pokemonOne, pokemonTwo) => {
    // Se general los atributos de cada pokemon elegido.
    getPokemonStats(firstPokemon, pokemonBlue);
    getPokemonStats(secondPokemon, pokemonRed);

    // Se actualiza el DOM según los pokemones elegidos
    setDomPokemon(pokemonBlue, firstPokemonDOM);
    setDomPokemon(pokemonRed, secondPokemonDOM);

    // Primero se define quien comienza con la batalla pokemon.
    // Si el tipo del segundo pokemon es débil contra el primero, comienza el primer pokemon
    // Si el tipo del primer pokemon es débil contra el segundo, comienza el segundo
    // Si no pasa ninguna de las condiciones anteriores, se elige elige de forma aleatoria
    let turn = 0;

    if(pokemonOne.type === pokemonTwo.debilityType) {
        turn = 1;
    } else if(pokemonOne.debilityType === pokemonTwo.type){
        turn = 2;
    } else {
        turn = getRandomIntInclusive(1, 2);
    }

    console.log(
        `${turn === 1 ? pokemonOne.name : pokemonTwo.name
        } comienza con el primer ataque`
    );

    pokemonBattleDOM.innerHTML += `<p class="${turn === 1 ? pokemonOne.type : pokemonTwo.type}">${turn === 1 ? pokemonOne.name : pokemonTwo.name} comienza con el primer ataque</p>`;

    // Comienza la batalla
    do {
        // Si el turno es 1 comienza el primer pokemon elegido, si es 2 comienza el segundo pokemon elegido.
        if (turn === 1) {
            pokemonBattleProcess(pokemonOne, pokemonTwo);
            turn = 2;
        } else {
            pokemonBattleProcess(pokemonTwo, pokemonOne);
            turn = 1;
        }

        // Si los puntos de salud de alguno de los pokemones es 0, se termina el bucle.
        if(Math.round(pokemonOne.healthPoints) === 0 || Math.round(pokemonTwo.healthPoints) === 0){
            break;
        }
        
    } while (pokemonOne.healthPoints > 0 || pokemonTwo.healthPoints > 0);

    // Define al ganador
    if(Math.round(pokemonOne.healthPoints) === 0 ) {
        console.log(`El ganador es ${pokemonTwo.name}`);
        pokemonWinnerDOM.innerHTML = `<p>El ganador es <br/> <span>${pokemonTwo.name}</span></p>`;
    } else if(Math.round(pokemonTwo.healthPoints) === 0) {
        console.log(`El ganador es ${pokemonOne.name}`);
        pokemonWinnerDOM.innerHTML = `<p>El ganador es <br/> <span>${pokemonOne.name}</span></p>`;
    }
};

// Si no se ha definido el primer ni el segundo pokemon y los atributos de ambos estás vacíos, no comenzara la batalla pokemon
if(firstPokemon && secondPokemon && pokemonBlue != {} && pokemonRed != {}) {
    pokemonBattle(pokemonBlue, pokemonRed);
}

// Función para obtener un numero random entre dos valores contando los iniciales.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
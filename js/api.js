//Se coloca toda la lógica respecto a la API de pokemon y la información que se muestra del mismo.

async function findPokemon(numero) {
    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
        const data = await response.json();

        const pokemonStats = {
            name: data.name,
            number: numero,
            types: [],
            stats: {},
        };

        //Evaluo el tamapo de type para asignar variable segun corresponda
        if (data.types.length > 1) {
            pokemonStats.types.push(data.types[1].type.name);
            pokemonStats.types.push(data.types[0].type.name);
        } else {
            pokemonStats.types.push(data.types[0].type.name);
        }

        //Stats
        pokemonStats.stats = {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
        };

        console.log(pokemonStats)
        return pokemonStats;

    } catch (error) {
        console.log("Error en la API "+ error)
    }
};
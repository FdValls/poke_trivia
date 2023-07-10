
const send = document.getElementById('send')
const reload = document.getElementById('reload')
const txtInput = document.querySelector("input");
const resultText = document.getElementById("resultText");
const pokeName = document.getElementById("data-poke-name");
const pokeId = document.getElementById("data-poke-id");
const pokeTypes = document.getElementById("data-poke-types");
const pokeTypesSlot1 = document.getElementById("slot1");
const pokeTypesSlot2 = document.getElementById("slot2");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

let removeClassSuccess = document.querySelector(".block");
let imgPokemon = document.getElementById("imgpokemon");
let txtRemove = document.getElementById("resultText")
let puntaje = document.getElementById("puntaje")

//Rules
let flag = false
let LIMIT = 3

function agregarEventos(pokemons) {
  numero = Math.floor(Math.random() * pokemons.length);
  imgPokemon.src = pokemons[numero].thumbnail

  reload.onclick = () => {
    restart(numero)
    numero = restart(numero)
    if (localStorage.getItem("cantidadEncuestados") == LIMIT) {
      localStorage.setItem("cantidadEncuestados", 0)
      localStorage.setItem("cantidadAcertados", 0)
      window.location.reload()
    }
    flag = false
  }

  send.onclick = () => {
    if (!flag) {
      let nameInput = txtInput.value.toLowerCase()
      if (txtInput.value.length != 0) {
        cantidadEncuestados += 1
        localStorage.setItem("cantidadEncuestados", cantidadEncuestados)

        if (pokemons[numero].name.toLowerCase() == nameInput) {
          resultText.textContent = "¡Felicidades! es " + pokemons[numero].name

          console.log(busquedaDePokemon(pokemons[numero].id));
          busquedaDePokemon(pokemons[numero].id);

          cantidadAcertados += 1
          localStorage.setItem("cantidadAcertados", cantidadAcertados)
        } else {
          resultText.textContent = "NO!, es " + pokemons[numero].name
        }
        removeClassSuccess.classList.remove("block");
        removeClassSuccess.classList.add("success");
      } else {
        alert("Debe colocar el nombre de un pokemon")
      }
      setPuntajeBajo(cantidadEncuestados, cantidadAcertados)
      flag = true
      puntaje.textContent = "Puntaje " + cantidadAcertados + " de " + cantidadEncuestados
      flag = true
    }
    if (localStorage.getItem("cantidadEncuestados") == null || localStorage.getItem("cantidadAcertados") == null) {
      localStorage.setItem("cantidadEncuestados", 0)
      localStorage.setItem("cantidadAcertados", 0)
    } else {
      localStorage.getItem("cantidadEncuestados")
      localStorage.getItem("cantidadAcertados")
    }

  }

}

const setPuntajeBajo = (cantidadEncuestados, cantidadAcertados) => {
  cantidadAcertados > cantidadEncuestados / 2 ? puntaje.classList.remove("puntajeBajo") : puntaje.classList.add("puntajeBajo")
}

const restart = (numero) => {

  txtRemove.textContent = ""
  removeClassSuccess.classList.add("block")
  numero = Math.floor(Math.random() * pokemons.length);
  imgPokemon.src = pokemons[numero].thumbnail

  return numero

};

//Si adivino el pokemon llamo a la funcion que cree
async function busquedaDePokemon(numero) {
  const pokemonStats = await findPokemon(numero);
  if (pokemonStats) {
    pokeName.textContent = pokemonStats.name;
    pokeId.textContent = pokemonStats.number;
    if (pokemonStats.types.length > 1) {
      pokeTypesSlot1.textContent = pokemonStats.types[0]
      pokeTypesSlot2.textContent = pokemonStats.types[1]
    } else {
      //Agrego un salto de linea para no romper el estilo (se subia la pokeball)
      const brElement = document.createElement("br");
      pokeTypes.insertBefore(brElement, pokeTypesSlot2);
      pokeTypesSlot1.textContent = pokemonStats.types[0]
      pokeTypes.removeChild(pokeTypesSlot2)
    }
    hp.textContent = pokemonStats.stats.hp
    attack.textContent = pokemonStats.stats.attack
    defense.textContent = pokemonStats.stats.defense
    specialAttack.textContent = pokemonStats.stats.specialAttack
    specialDefense.textContent = pokemonStats.stats.specialDefense
    speed.textContent = pokemonStats.stats.speed
  }
}
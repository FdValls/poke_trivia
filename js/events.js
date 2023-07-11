"use strict";

const send = document.getElementById('send')
const reset = document.getElementById('reset')
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
let LIMIT = 10

function agregarEventos(pokemons) {
  numero = Math.floor(Math.random() * pokemons.length);
  imgPokemon.src = pokemons[numero].thumbnail

  reload.onclick = () => {
    numero = restart()
    //Cuando llega a 10 termina el juego, y se resetea los contadores
    if (cantidadEncuestados == LIMIT) {
      localStorage.setItem("cantidadEncuestados", 0)
      localStorage.setItem("cantidadAcertados", 0)
      puntaje.textContent = "Puntaje " + 0 + " de " + 0
      cantidadAcertados > cantidadEncuestados / 2 ? alert("GANASTE!") : alert("PERDISTE")
    }
    //Una vez adivinado el pokemon cuando recargo reseteo los stats
    restartStats()
    txtInput.value = ""
    flag = false
  }

  reset.onclick = () => {
    //Reseteo toda la app
    alert("RESTART APP")
    restartStats()
    localStorage.setItem("cantidadEncuestados", 0)
    localStorage.setItem("cantidadAcertados", 0)
    puntaje.textContent = "Puntaje " + 0 + " de " + 0
  }

  send.onclick = () => {
    //Este Flag es para cuando clickea enviar, solo lo permita 1 vez sola, al tocar RELOAD vuelve a permitir volver a enviar la rta
    if (!flag) {
      let nameInput = txtInput.value.toLowerCase()
      if (txtInput.value.length != 0) {
        //Incremento el localStorage encuestados +1
        cantidadEncuestados = parseInt(localStorage.getItem("cantidadEncuestados"));
        cantidadEncuestados += 1;

        localStorage.setItem("cantidadEncuestados", cantidadEncuestados)


        if (pokemons[numero].name.toLowerCase() == nameInput) {
          //Si acierto, incremento el localStorage acertados +1
          cantidadAcertados = parseInt(localStorage.getItem("cantidadAcertados"));
          cantidadAcertados += 1;
          localStorage.setItem("cantidadAcertados", cantidadAcertados)

          resultText.textContent = "¡Felicidades! es " + pokemons[numero].name

          console.log(busquedaDePokemon(pokemons[numero].id));
          busquedaDePokemon(pokemons[numero].id);

        } else {
          resultText.textContent = "NO!, es " + pokemons[numero].name
        }
        removeClassSuccess.classList.remove("block");
        removeClassSuccess.classList.add("success");
        flag = true

      } else {
        alert("Debe colocar el nombre de un pokemon")
        flag = false
      }
      setPuntajeBajo(cantidadEncuestados, cantidadAcertados)
      puntaje.textContent = "Puntaje " + parseInt(cantidadAcertados) + " de " + parseInt(cantidadEncuestados)

    }
  }

}

const setPuntajeBajo = () => {
  cantidadAcertados > cantidadEncuestados / 2 ? puntaje.classList.remove("puntajeBajo") : puntaje.classList.add("puntajeBajo")
}

const restart = () => {
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

async function restartStats() {
  pokeName.textContent = "NAME"
  pokeId.textContent = "N° ..."
  pokeTypesSlot1.textContent = "TYPE 1"
  pokeTypesSlot2.textContent = "TYPE 2"
  hp.textContent = "99"
  attack.textContent = "99"
  defense.textContent = "99"
  specialAttack.textContent = "99"
  specialDefense.textContent = "99"
  speed.textContent = "99"
}
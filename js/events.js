
const send = document.getElementById('send')
const reload = document.getElementById('reload')
const txtInput = document.querySelector("input");
const resultText = document.getElementById("resultText");
let removeClassSuccess = document.querySelector(".block");
let imgPokemon = document.getElementById("imgpokemon");
let txtRemove = document.getElementById("resultText")
let puntaje = document.getElementById("puntaje")
let flag = false
let LIMIT = 3

// function agregarEventos(cantidadEncuestados, numero, cantidadAcertados, pokemons)
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
      let namePokemon = pokemons[numero].name.toLowerCase()
      let nameInput = txtInput.value.toLowerCase()
      if (txtInput.value.length != 0) {
        cantidadEncuestados += 1
        localStorage.setItem("cantidadEncuestados", cantidadEncuestados)

        if (pokemons[numero].name.toLowerCase() == nameInput) {
          resultText.textContent = "¡Felicidades! es " + namePokemon
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
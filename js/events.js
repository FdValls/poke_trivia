
const send = document.getElementById('send')
const reload = document.getElementById('reload')
const txtInput = document.querySelector("input");
const resultText = document.getElementById("resultText");
let removeClassSuccess = document.querySelector(".block");
let imgPokemon = document.getElementById("imgpokemon");
let txtRemove = document.getElementById("resultText")
let puntaje = document.getElementById("puntaje")
let flag = false


function agregarEventos(cantidadEncuestados, numero, cantidadAcertados) {
  numero = Math.floor(Math.random() * cantPoke());
  imgPokemon.src = pokemons[numero].thumbnail

  reload.onclick = () => {
    restart(numero)
    numero = restart(numero)
    flag = false
    console.log("Flag " + flag)
  }

  send.onclick = () => {
    if (!flag) {
      let namePokemon = pokemons[numero].name.toLowerCase()
      let nameInput = txtInput.value.toLowerCase()
      if (txtInput.value.length != 0) {
        cantidadEncuestados += 1
        if (pokemons[numero].name.toLowerCase() == nameInput) {
          resultText.textContent = "¡Felicidades! es " + namePokemon
          // removeClassSuccess.classList.replace("block", "block success");
          removeClassSuccess.classList.remove("block");
          removeClassSuccess.classList.add("success");
          cantidadAcertados += 1
        } else {
          resultText.textContent = "NO!, es " + namePokemon
        }
      } else {  
        alert("Debe colocar el nombre de un pokemon")
      }
      setPuntajeBajo(cantidadEncuestados, cantidadAcertados)
      console.log(puntaje.textContent = "Puntaje " + cantidadAcertados + " de " + cantidadEncuestados)
      flag = true
      console.log("que tiene Flag " + flag)
    }
  }

}


const setPuntajeBajo = (cantidadEncuestados, cantidadAcertados) => {
  console.log(cantidadAcertados > cantidadEncuestados / 2 ? puntaje.classList.remove("puntajeBajo") : puntaje.classList.add("puntajeBajo"))

}

const restart = (numero) => {

  txtRemove.textContent = ""
  removeClassSuccess.classList.add("block")
  numero = Math.floor(Math.random() * cantPoke());
  imgPokemon.src = pokemons[numero].thumbnail

  return numero

};
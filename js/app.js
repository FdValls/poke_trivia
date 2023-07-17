"use strict";

var numero = 0;  // Se utiliza para saber el nº de pokemon a adivinar
var cantidadAcertados = 0;  // Se utiliza para saber cuantos pokemons fueron adivinados
var cantidadEncuestados = 0;  // Se utiliza para saber cuantos pokemons se intentaron adivinar

const pokes = JSON.parse(jsonData)

let pokemons = pokes.map(function(p){
    return new Pokemon(p.id, p.name)
});

cantidadAcertados = parseInt(localStorage.getItem("cantidadAcertados")) || 0;
cantidadEncuestados = parseInt(localStorage.getItem("cantidadEncuestados")) || 0;


puntaje.textContent = "Puntaje " + cantidadAcertados.toString() + " de " + cantidadEncuestados.toString()
setPuntajeBajo(cantidadEncuestados, cantidadAcertados)

agregarEventos(pokemons);
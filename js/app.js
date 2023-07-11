"use strict";

var numero = 0;  // Se utiliza para saber el nº de pokemon a adivinar
var cantidadAcertados = 0;  // Se utiliza para saber cuantos pokemons fueron adivinados
var cantidadEncuestados = 0;  // Se utiliza para saber cuantos pokemons se intentaron adivinar

const pokes = JSON.parse(jsonData)

let pokemons = pokes.map(function(p){
    return new Pokemon(p.id, p.name)
});

cantidadAcertados = localStorage.getItem("cantidadAcertados")
cantidadEncuestados = localStorage.getItem("cantidadEncuestados")

puntaje.textContent = "Puntaje " + parseInt(cantidadAcertados) + " de " + parseInt(cantidadEncuestados)
setPuntajeBajo(cantidadEncuestados, cantidadAcertados)

agregarEventos(pokemons);
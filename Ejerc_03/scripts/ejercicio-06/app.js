/*
En app.js, muestra la colección de libros, luego llama a ordenarPorPaginas() y vuelve a mostrar la colección para verificar que se ha ordenado correctamente.
*/

import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas } from "./biblioteca.js";

console.log(obtenerLibros()); // <== no devuelve libros

const libroNuevo = {
    id: undefined ,
    titulo: "Los pilares de la tierra",
    autor: "Ken Follett",
    paginas: 1043
}

agregarLibro(libroNuevo);

console.log(obtenerLibros());

let libroEncontrado = buscarLibro(5);
console.log(libroEncontrado);

eliminarLibro(5);

console.log(obtenerLibros());

console.log(calcularTotalPaginas());

ordenarPorPaginas();

console.log(obtenerLibros());
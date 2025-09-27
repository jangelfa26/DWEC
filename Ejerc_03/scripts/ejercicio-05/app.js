/*
En app.js, importa y utiliza esta función para imprimir en la consola el número total de páginas que suman todos los libros.
*/

import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas } from "./biblioteca.js";

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


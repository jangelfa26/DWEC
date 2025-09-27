/*
En app.js, prueba ambas funciones con diferentes valores de limitePaginas y muestra los resultados (true o false).
*/

import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos } from "./biblioteca.js";

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

console.log(hayLibrosLargos(250));

console.log(todosSonLibrosCortos(120));
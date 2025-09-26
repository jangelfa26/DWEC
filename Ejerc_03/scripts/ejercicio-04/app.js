/*
En app.js, importa y prueba estas nuevas funciones. Busca un libro por su id y muéstralo. Luego, elimina un libro y muestra la colección final.
*/

import { agregarLibro, obtenerLibros } from "./biblioteca.js";

console.log(obtenerLibros()); // <== no devuelve libros

const libroNuevo = {
    id: undefined ,
    titulo: "Los pilares de la tierra",
    autor: "Ken Follett",
    paginas: 1043
}

agregarLibro(libroNuevo);

console.log(obtenerLibros());
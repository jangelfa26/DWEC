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
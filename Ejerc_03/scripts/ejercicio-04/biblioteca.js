/*
Mejora el módulo biblioteca.js del ejercicio anterior. Añade las siguientes funciones:
1. buscarLibro(id): Utiliza .find() para buscar un libro por su id y devolverlo.
2. eliminarLibro(id): Utiliza .findIndex() para encontrar el índice del libro con ese id y luego .splice() para eliminarlo de la colección.
*/

const libros = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    paginas: 471
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    paginas: 863
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    paginas: 328
  },
  {
    id: 4,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    paginas: 96
  },
  {
    id: 5,
    titulo: "Crimen y castigo",
    autor: "Fiódor Dostoyevski",
    paginas: 671
  },
  {
    id: 6,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    paginas: 432
  },
  {
    id: 7,
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    paginas: 201
  },
  {
    id: 8,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    paginas: 632
  },
  {
    id: 9,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    paginas: 256
  },
  {
    id: 10,
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
    paginas: 512
  }
];

export function agregarLibro(nuevoLibro) {
    let numeroLibros = libros.length+1;
    nuevoLibro.id = numeroLibros;
    libros.push(nuevoLibro);
}

export function obtenerLibros() {
    return libros;
}

function buscarLibro(id) {
  return libros.find(libro => libro.id = id);  
}

function eliminarLibro(id) {
  let posicionBorrar = libros.findIndex(libro => libro.id = id);

  libros.splice(posicionBorrar, 1);

}
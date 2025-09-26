/*
En `biblioteca.js`, vas a crear un módulo para gestionar una colección de libros. Este módulo debe tener:
1. Un arreglo de objetos llamado `libros`. Cada objeto representará un libro con `id` (número), `titulo` (string), `autor` (string) y `paginas` (número). Inicialízalo con 10 libros.
2. Una función `agregarLibro(nuevoLibro)` que añada un nuevo libro a la colección.
3. Una función `obtenerLibros()` que devuelva la colección completa.

Exporta ambas funciones.
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
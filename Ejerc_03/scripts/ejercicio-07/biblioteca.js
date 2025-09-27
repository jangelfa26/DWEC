/*
Añade dos funciones más al módulo biblioteca.js:
1. hayLibrosLargos(limitePaginas): Utiliza .some() para comprobar si hay al menos un libro en la colección que tenga más páginas que limitePaginas.
2. todosSonLibrosCortos(limitePaginas): Utiliza .every() para comprobar si todos los libros de la colección tienen menos páginas que limitePaginas.
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

export function buscarLibro(id) {
  return libros.find(libro => libro.id == id);  
}

export function eliminarLibro(id) {
  let posicionBorrar = libros.findIndex(libro => libro.id == id);

  libros.splice(posicionBorrar, 1);

}

export function calcularTotalPaginas() {
  let listaPaginas= [];
  listaPaginas = libros.map(libro => libro.paginas);
  let totalPaginas = listaPaginas.reduce((total, numeroPaginas) => total + numeroPaginas, 0)
  return totalPaginas;
}

export function ordenarPorPaginas() {
  libros.sort((a,b) => a.paginas-b.paginas);
  
}

export function hayLibrosLargos(limitePaginas) {
  let hayLibrosExtensos = libros.some(libro => libro.paginas > limitePaginas);
  return hayLibrosExtensos;
}

export function todosSonLibrosCortos(limitePaginas) {
  let todosLibrosCortos = libros.every(libro => libro.paginas <= limitePaginas);
  return todosLibrosCortos;
}



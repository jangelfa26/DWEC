/*
Ejercicio 3.1: Creando tu primera lista de reproducción
Define un arreglo de objetos llamado `playlist`. Cada objeto representará una canción y debe tener las siguientes propiedades: `titulo` (string), `artista` (string) y `duracion` (número en segundos).
Agrega al menos 10 canciones a la `playlist`. Luego, utiliza un bucle `forEach` para imprimir en la consola el título y el artista de cada canción.
*/

// los comentarios al lado de la duración es la conversion a minutos

const playlist = [
  {
    titulo: "Bohemian Rhapsody",
    artista: "Queen",
    duracion: 354 // 5:54
  },
  {
    titulo: "Billie Jean",
    artista: "Michael Jackson",
    duracion: 294 // 4:54
  },
  {
    titulo: "Smells Like Teen Spirit",
    artista: "Nirvana",
    duracion: 301 // 5:01
  },
  {
    titulo: "Hotel California",
    artista: "Eagles",
    duracion: 391 // 6:31
  },
  {
    titulo: "Shape of You",
    artista: "Ed Sheeran",
    duracion: 233 // 3:53
  },
  {
    titulo: "Hey Jude",
    artista: "The Beatles",
    duracion: 431 // 7:11
  },
  {
    titulo: "Rolling in the Deep",
    artista: "Adele",
    duracion: 228 // 3:48
  },
  {
    titulo: "Wonderwall",
    artista: "Oasis",
    duracion: 259 // 4:19
  },
  {
    titulo: "Blinding Lights",
    artista: "The Weeknd",
    duracion: 200 // 3:20
  },
  {
    titulo: "Imagine",
    artista: "John Lennon",
    duracion: 187 // 3:07
  }
];

console.log("Lista de canciones");
console.log("=============================");
playlist.forEach(cancion => {
 console.log(cancion.titulo);
 console.log(cancion.artista);
 console.log("=============================")   
});


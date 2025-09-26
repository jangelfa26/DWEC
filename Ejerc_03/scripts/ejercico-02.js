/*Ejercicio 3.2: Filtrando canciones largas
Crea un archivo `ejercicio-02.js`. Copia la `playlist` del ejercicio anterior. Ahora, utiliza el método `.filter()` para crear un nuevo arreglo que contenga únicamente las canciones que duren más de 180 segundos.
Finalmente, utiliza `.map()` en el nuevo arreglo filtrado para crear un arreglo de strings que contenga el mensaje: “La canción ‘[TITULO]’ de [ARTISTA] dura [DURACION] segundos.” Imprime este último arreglo en la consola.
*/
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
    duracion: 25 // 4:19 // valor original 259
  },
  {
    titulo: "Blinding Lights",
    artista: "The Weeknd",
    duracion: 30 // 3:20 //valor original 200
  },
  {
    titulo: "Imagine",
    artista: "John Lennon",
    duracion: 170 // 3:07 // valor original 187
  }
];

function montarCadenas(listaCanciones) {
    let informacionDevolver = []
    let cadena = "";
    //console.log(typeof(listaCanciones))
    //console.log(listaCanciones)
    let titulo = listaCanciones.titulo;
    let artista = listaCanciones.artista;
    let duracion = listaCanciones.duracion;
    
    cadena = "La cancion "+ titulo +" de " + artista + " dura " + duracion + " segundos.";
    informacionDevolver.push(cadena);
        
    return informacionDevolver

}

let cancionesFiltradas = [];
cancionesFiltradas = playlist.filter(cancion => cancion.duracion > 180);
console.log(cancionesFiltradas)

let cancionesLargas = [];
cancionesLargas = cancionesFiltradas.map(montarCadenas)
console.log(cancionesLargas);
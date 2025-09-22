import {calcularPromedioEdad, crearPerfil, esMayorDeEdad, obtenerMayoresDeEdad} from "./gestorUsuarios.js"
import mostrarPerfil from "./gestorUsuarios.js"

let usuario1 = crearPerfil("Anacleto", "anacleto@email.es", 57)
let usuario2 = crearPerfil("Paco", "Paco@email.es", 2)
console.log (usuario1)

const usuarios = [usuario1, usuario2]
usuarios.forEach(usuario =>{
    mostrarPerfil(usuario)
})



let usuario3 = crearPerfil("Manuel","Manu@email.com", 16)
let usuario4 = crearPerfil("Luis", "luis@email.com", 25)
let usuario5 = crearPerfil("Carmen", "Carmen@email.com", 33)

usuarios.push(usuario3, usuario4, usuario5)

const usuariosMayoresDeEdad = usuarios.filter(esMayorDeEdad)

console.log("Usuarios mayores de edad:")
console.log(obtenerMayoresDeEdad(usuariosMayoresDeEdad))

console.log("La edad promedio de los usuarios es : " + calcularPromedioEdad(usuarios))



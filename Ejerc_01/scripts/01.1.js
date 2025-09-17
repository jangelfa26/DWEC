const nombre = "José Ángel"
let edad = 21
const tieneMascota = true

edad = 25
//tieneMascota = false <== si se descomenta da error y no muestra en consola

console.log(nombre)
console.log(typeof(nombre))
console.log(edad)
console.log(typeof(edad))
console.log(tieneMascota)
console.log(typeof(tieneMascota))
if(tieneMascota){
    console.log(nombre + " tiene " + edad +" años y tiene mascota" )
} else {
    console.log(nombre + " tiene " + edad +" años y no tiene mascota" )
}

const ciudades =["Madrid", "Buenos Aires", "Tokio", "Nueva York", "Paris"]
console.log(ciudades)

ciudades.push("Roma")
console.log(ciudades)

const ciudadesMayusculas = ciudades.map()


const ciudadesFiltradas = ciudades.filter(ciudad => ciudad.length > 6)
console.log(ciudadesFiltradas)

/*

// Objetos

const producto = {
    nombre : "Tablet",
    precio: 300,
    disponible: false
}

 //console.log(producto)
// console.table(producto)
//  console.log(producto.nombre)

// Destructuring
// const { nombre, precio, disponible } = producto // separo el producto en varias variables nuevas, bueno sigue existiendo producto
    //const { nombre:nombre, precio:precio, disponible:disponible } = producto // esto es igual a lo de arriba
// console.log(nombre)
// console.log(precio)
// console.log(disponible)

// const nombre = producto.nombre
// const precio = producto.precio
// const disponible = producto.disponible
// console.log(nombre)
// console.log(precio)
// console.log(disponible)

// Object Literal Enhacement
const autenticado = true
const usuario = "Juan"
const nuevoObjeto = {
    autenticado,
    usuario
}
console.log(nuevoObjeto)
*/
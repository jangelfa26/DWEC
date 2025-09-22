// Ejercicio 2.4: Combinación de Objetos y Optional Chaining

//Crea un objeto usuario con nombre y email.
const usuario = {nombre: "Felipe", email: "felipela@email.com"}

//Crea un objeto perfil con puesto y empresa.
const perfil = {puesto: "Jefe de RRHH", empresa: "Industrias pela"}

//Combina ambos objetos en un nuevo objeto empleado usando el “spread operator” (...).
const empleado = {
    ...usuario,
    ...perfil
}

//Supongamos que el objeto empleado podría tener o no una propiedad anidada perfil.direccion.ciudad. Intenta acceder a empleado.perfil.direccion.ciudad usando “Optional Chaining” (?.) para evitar errores.
console.log(empleado.perfil?.direccion.ciudad)



sumar(10, 20)
sumar(300, 1)
sumar(100)

// // Funciones - Function Expression
// se pueden asignar a una variable
// hay que llamarlas después de haber sido declaradas
// const sumar = function(numero1 = 0, numero2 = 0) {
//     console.log(numero1 + numero2)
// }
// Así si funcionaría, esto se llama hoisting, las funciones 
//  se suben al inicio del archivo automáticamente
function sumar(numero1 = 0, numero2 = 0) {
    console.log(numero1 + numero2)
}


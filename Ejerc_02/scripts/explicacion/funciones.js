
export const sumar = (n1, n2) => n1 + n2
// const sumar = function(n1, n2){ return n1+n2} esto es igual que lo de arriba

export const restar = (n1, n2) => n1 - n2

export const multiplicar = (n1, n2) =>  n1 * n2

export const division = (n1, n2)  => n1 / n2

//se puede quitar el export de cada función y exportar al final
// export {sumar, restar, multiplicar, division}
// para evitar conflictos de nombres 


// export default function sumar(n1, n2) {
//     return n1 + n2   
// }
// para importar la función por defecto se usa:
// import sumar from './funciones.js'   
// o import cualquierNombre from './funciones.js'
// y se puede usar cualquierNombre para la función importada

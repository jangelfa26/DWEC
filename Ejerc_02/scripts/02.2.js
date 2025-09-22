//Ejercicio 2.2: Funciones

//Escribe una Function Declaration llamada calcularAreaRectangulo que acepte base y altura y devuelva el área.
function calcularAreaRectangulo(base = 2, altura= 8) {
    let area = base * altura
    return area
}
//Escribe la misma lógica usando una Function Expression y guárdala en una constante calcularAreaTriangulo.
const calcularAreaTriangulo = function calcularArea(base = 8, altura = 6) {
    let area = (base * altura)/2
    return area
}
// Convierte la función anterior en una Arrow Function.
const calcularAreaTriangulo2 = (base = 6, altura = 8 ) => console.log(base * altura)/2

//Añade valores por defecto a los parámetros de cualquiera de las funciones anteriores.
//Llama a cada función con valores de prueba y muestra el resultado en la consola.

console.log(calcularAreaRectangulo(5,12))

console.log(calcularAreaTriangulo(8, 5))

console.log(calcularAreaTriangulo2(8,13))
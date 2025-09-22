//Ejercicio 2.1: Arrays y Métodos

//Crea un array numeros con al menos 6 números.
const numeros = [1, 2, 3, 4, 5, 6]
console.log(numeros)
//Usa el método .map() para crear un nuevo array dobles que contenga el doble de cada número del array original.
const numerosDobles = numeros.map(numero => numero*2)
console.log(numerosDobles)
//Usa el método .filter() para crear un nuevo array pares que contenga solo los números pares del array numeros.
const numerosPares = numeros.filter(numero => numero%2 == 0)
console.log(numerosPares)

//Usa un bucle for...of para imprimir cada número del array pares en la consola.

for(const numero of numeros){
    if(numero % 2 == 0){
        console.log(numero)
    }
}
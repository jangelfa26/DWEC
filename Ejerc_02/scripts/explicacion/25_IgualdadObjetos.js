let harry = { name: 'Harry Smith', age: 42 } 

let harry2 = harry // esto no es que harry2 = {name, age}, si cambias harry2 los cambios tambien se veran en harry

harry === harry2 // verdadero: dos referencias al mismo objeto 

let harry3 = { name: 'Harry Smith', age: 42 } // esto no es igual a harry2 y harry porque es una "caja" distinta a la de los otros a pesar de tener el mismo contenido

harry === harry3 // falso: objetos diferentes 
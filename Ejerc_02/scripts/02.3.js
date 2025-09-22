//Ejercicio 2.3: Condicionales y Operadores Lógicos


//Crea una función que reciba un saldo y una cantidad a retirar.
//Dentro de la función, comprueba si el saldo es mayor o igual a la cantidad a retirar.
//Si se puede retirar, muestra “Retiro exitoso. Saldo restante: [nuevo saldo]”.
//Si no, muestra “Saldo insuficiente”.


function sacarDineroDebito(saldo, retirar) {
    if(saldo >= retirar){
        let nuevoSaldo = saldo - retirar
        return "Retiro exitorso. Saldo restante [" + nuevoSaldo + "]";
        saldo = nuevoSaldo   
    } else {
        return "Saldo insuficiente."
    }
}

console.log(sacarDineroDebito(10, 9))

//Extra: Añade una variable booleana tieneTarjetaCredito. Modifica la lógica para que, si el saldo no es suficiente PERO tieneTarjetaCredito es true, muestre “Saldo insuficiente, pagando con tarjeta de crédito”.

function sacarDineroCredito(saldo, retirar, tieneTarjetaCredito) {
    if(tieneTarjetaCredito == true){
        if(saldo >= retirar){
            return sacarDineroDebito(saldo, retirar);
        }else{
            return "Saldo insuficiente, pagando con tarjeta de crédito";
        }
    } else{
        return sacarDineroDebito(saldo, retirar);
    }    
}

console.log(sacarDineroCredito(10,12,true));

console.log(sacarDineroCredito(12,3,true));

console.log(sacarDineroCredito(10,12,false));

const producto = {
    nombre: "esparragos",
    precio: 2
}

const cliente = {
    nombreCliente: "Manuel",
    esPremium: true
}

const pedido ={
    ...cliente,
    ...producto
}

console.table(pedido)

const producto2 ={
    nombre: "Judias verdes",
    precio: 3

}

pedido2 ={
    ...cliente,
    ...producto2
}
console.table(pedido2)

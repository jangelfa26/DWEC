export function crearProducto (nombre, categoria, precio, stock){
    const producto={
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock
    }
    return producto
}
export function filtrarPorCategoria(inventario, categoria) {
    
    return inventario.filter(producto => producto.categoria == categoria)
}

export function listarProductosAgotados(inventario) {
    
    return inventario.filter(producto => producto.stock == 0)
}

export function calcularValorTotalInventario(inventario) {
    
    return inventario.reduce((total, producto) => total + (producto.precio * producto.stock), 0)

}


export default function resumenInventario(inventario) {
    const totalProductos = inventario.length;
    const categorias = [inventario.map(producto => producto.categoria)]; 
    const valorTotal = calcularValorTotalInventario(inventario);

    console.log("Resumen del Inventario: ")
    console.log("Total de productos: "+ totalProductos)
    console.log("Categorias: " + categorias)
    console.log("Valor total: "+ valorTotal)
}
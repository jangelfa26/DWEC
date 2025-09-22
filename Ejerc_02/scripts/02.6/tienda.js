import { crearProducto, filtrarPorCategoria, listarProductosAgotados, calcularValorTotalInventario} from "./inventario.js";
import resumenInventario from "./inventario.js"

let producto1 = crearProducto('Camiseta', 'Ropa', 20, 50);
let producto2 = crearProducto('Pantalón', 'Ropa', 30, 0); 
let producto3 = crearProducto('telefono', 'Electrónica', 500, 10);
let producto4 = crearProducto('portatil', 'Electrónica', 1000, 5);
let producto5 = crearProducto('Cuento', 'Libros', 10, 100);
let producto6 = crearProducto('Novela', 'Libros', 15, 0);

const inventario = [producto1, producto2, producto3, producto4, producto5, producto6];

const productosRopa = filtrarPorCategoria(inventario, 'Ropa');
console.log('Productos de la categoría Ropa:', productosRopa);

const productosAgotados = listarProductosAgotados(inventario);
console.log('Productos agotados:', productosAgotados);

const valorTotalInventario = calcularValorTotalInventario(inventario);
console.log('Valor total del inventario:', valorTotalInventario);


resumenInventario(inventario);

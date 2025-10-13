let productos = document.querySelectorAll("li");

productos.forEach(producto =>{
    let botonCarrito = producto.lastElementChild;
    let carrito = document.querySelector("#carrito");
    botonCarrito.addEventListener("click", () => {
        let productoClonar = producto.cloneNode(true);
        
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            carrito.removeChild(productoClonar);
            calcularTotal();
        })
        
        productoClonar.appendChild(botonEliminar);
        
        carrito.appendChild(productoClonar);
        calcularTotal();
    })
})

function calcularTotal() {
    let carrito = document.querySelectorAll("#carrito li");
    let total = 0;
    carrito.forEach(articulo => {
        let precioProducto = parseInt(articulo.getAttribute("data-price"));
        total += precioProducto;
        total = document.querySelector("#total").textContent = total;
    });
        
    
}

let carrito = [];
let listaProductos = document.querySelectorAll(".producto");
let listaCarrito = document.getElementById("carrito");
let totalElemento = document.getElementById("total");

listaProductos.forEach(producto => {
    let boton = producto.querySelector("button");

    boton.addEventListener("click", () => {
        let nombre = producto.querySelector("h3").textContent;
        let precio = parseFloat(producto.getAttribute("data-price"));

        let productoEnCarrito = carrito.find(articulo => articulo.nombre == nombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        renderizarCarrito();
        calcularTotal();
    });
});

function renderizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(articulo => {
        let li = document.createElement("li");
        li.textContent = `${articulo.nombre} (x${articulo.cantidad}) - ${articulo.precio * articulo.cantidad} €`;
        listaCarrito.appendChild(li);
    });
}

function calcularTotal() {
    let total = 0;
    carrito.forEach(articulo => {
        total += (articulo.precio * articulo.cantidad);
    });

    totalElemento.textContent = total.toFixed(2);
}

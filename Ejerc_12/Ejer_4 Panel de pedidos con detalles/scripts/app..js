const contenedor = document.querySelector("#contenedorPedidos");
const estadoCarga = document.querySelector("#estadoCarga");

document.addEventListener("DOMContentLoaded", cargarPanel);

async function cargarPanel() {
    try {
        estadoCarga.textContent = "Cargando datos del panel…";

        const [resPedidos, resDetalles, resProductos] = await Promise.all([
            fetch("../data/pedidos.json"),
            fetch("../data/detalles_pedido.json"),
            fetch("../data/productos.json")
        ]);

        const pedidos = await resPedidos.json();
        const detalles = await resDetalles.json();
        const productos = await resProductos.json();

        const pedidosEnriquecidos = combinarDatos(pedidos, detalles, productos);

        mostrarPanel(pedidosEnriquecidos);

    } catch (error) {
        estadoCarga.textContent = "Error cargando datos.";
        console.error(error);
    }
}

function combinarDatos(pedidos, detalles, productos) {
    return pedidos.map(pedido => {
        
        const detallesPedido = detalles
            .filter(detalle => detalle.pedidoId == pedido.id)
            .map(detalle => {
                const producto = productos.find(producto => producto.id == detalle.productoId);

                return {
                    cantidad: detalle.cantidad,
                    precioUnitario: detalle.precioUnitario,
                    nombreProducto: producto ? producto.nombre : "Producto desconocido"
                };
            });

        const totalPedido = detallesPedido.reduce(
            (acc, det) => acc + det.cantidad * det.precioUnitario, 
            0
        );

        return {
            ...pedido,
            detalles: detallesPedido,
            totalPedido
        };
    });
}

function mostrarPanel(lista) {
    estadoCarga.textContent = "";

    contenedor.innerHTML = "";

    lista.forEach(pedido => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>
            <p><strong>Fecha:</strong> ${pedido.fecha}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
            <p class="total"><strong>Total:</strong> ${pedido.totalPedido.toFixed(2)} €</p>
            <h4>Detalles:</h4>
        `;

        const ul = document.createElement("ul");

        pedido.detalles.forEach(detalle => {
            const li = document.createElement("li");
            li.textContent = `${detalle.cantidad} x ${detalle.nombreProducto} - ${detalle.precioUnitario} €`;
            ul.appendChild(li);
        });

        tarjeta.appendChild(ul);
        contenedor.appendChild(tarjeta);
    });
}

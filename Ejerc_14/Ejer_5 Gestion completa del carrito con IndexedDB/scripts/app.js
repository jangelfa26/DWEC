let usuarios = [];
let productos = [];
let pedidos = [];
let detallesPedidos = [];

const estadoCarga = document.getElementById("estado-carga");
const panel = document.getElementById("panel");
const selectUsuarios = document.getElementById("selectUsuarios");

const panelUsuario = document.getElementById("panelUsuario");
const panelPedidos = document.getElementById("panelPedidos");
const panelResumen = document.getElementById("panelResumen");

async function cargarDatosIniciales() {
    try {
        const respuestas = await Promise.all([
            fetch("./data/usuarios.json"),
            fetch("./data/productos.json"),
            fetch("./data/pedidos.json"),
            fetch("./data/detalles_pedido.json")
        ]);

        usuarios = await respuestas[0].json();
        productos = await respuestas[1].json();
        pedidos = await respuestas[2].json();
        detallesPedidos = await respuestas[3].json();

        estadoCarga.style.display = "none";
        panel.classList.remove("oculto");

        inicializarDashboard();

    } catch (error) {
        estadoCarga.textContent = "Error cargando datos.";
        console.error("Error:", error);
    }
}

function inicializarDashboard() {
    usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = usuario.nombre;
        selectUsuarios.appendChild(option);
    });

    selectUsuarios.addEventListener("change", () => {
        const usuarioId = parseInt(selectUsuarios.value);

        if (!usuarioId) {
            limpiarPaneles();
            return;
        }

        mostrarDashboardUsuario(usuarioId);
    });
}

function mostrarDashboardUsuario(usuarioId) {

    const usuario = usuarios.find(usuario => usuario.id == usuarioId);

    renderizarInfoUsuario(usuario);

    const pedidosUsuario = pedidos.filter(pedido => pedido.usuarioId == usuarioId);

    renderizarPedidosUsuario(pedidosUsuario);

    const totalGasto = calcularTotalUsuario(pedidosUsuario);

    renderizarResumen(totalGasto);
}


function buscarDetallesDePedido(pedidoId) {
    return detallesPedidos.filter(detalle => detalle.pedidoId == pedidoId);
}

function calcularTotalPedido(listaDetalles) {
    let total = 0;

    listaDetalles.forEach(detalle => {
        const producto = productos.find(producto => producto.id == detalle.productoId);
        total += detalle.cantidad * producto.precio;
    });

    return total;
}

function calcularTotalUsuario(pedidosUsuario) {
    return pedidosUsuario.reduce((acum, pedido) => {
        const detalle = buscarDetallesDePedido(pedido.id);
        return acum + calcularTotalPedido(detalle);
    }, 0);
}

function renderizarInfoUsuario(usuario) {
    panelUsuario.innerHTML = `
        <div class="card">
            <h2>Datos del Usuario</h2>
            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Registro:</strong> ${usuario.fechaRegistro}</p>
        </div>
    `;
}

function renderizarPedidosUsuario(listaPedidos) {

    if (listaPedidos.length === 0) {
        panelPedidos.innerHTML = `
            <div class="card">
                <h2>Pedidos del Usuario</h2>
                <p>Este usuario no tiene pedidos registrados.</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="card">
            <h2>Pedidos del Usuario</h2>
    `;

    listaPedidos.forEach(pedido => {

        const detalles = buscarDetallesDePedido(pedido.id);
        const totalPedido = calcularTotalPedido(detalles);

        html += `
            <div class="card">
                <p><strong>Pedido:</strong> ${pedido.id}</p>
                <p><strong>Fecha:</strong> ${pedido.fecha}</p>

                <ul>
        `;

        detalles.forEach(det => {
            const producto = productos.find(p => p.id === det.productoId);

            html += ` <li>${producto.nombre} — ${det.cantidad} uds — ${(producto.precio * det.cantidad).toFixed(2)} €</li>`;
        });

        html += `</ul> <p><strong>Total del pedido:</strong> ${totalPedido.toFixed(2)} €</p> </div>`;
    });

    html += `</div>`;

    panelPedidos.innerHTML = html;
}

function renderizarResumen(total) {
    panelResumen.innerHTML = `
        <div class="card">
            <h2>Resumen</h2>
            <p><strong>Gasto total acumulado:</strong> ${total.toFixed(2)} €</p>
        </div>
    `;
}

function limpiarPaneles() {
    panelUsuario.innerHTML = "";
    panelPedidos.innerHTML = "";
    panelResumen.innerHTML = "";
}

cargarDatosIniciales();

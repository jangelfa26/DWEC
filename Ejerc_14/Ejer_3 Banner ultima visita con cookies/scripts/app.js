let listaProductos = [];
let productosMostrados = [];

async function cargarProductos() {
    const mensajeCarga = document.getElementById("mensaje-carga");

    try {
        mensajeCarga.textContent = "Cargando...";

        const respuesta = await fetch("../data/productos.json");
        if (!respuesta.ok) {
            throw new Error("Respuesta de red no OK: " + respuesta.status);
        }

        const datos = await respuesta.json();

        listaProductos = datos.slice();
        productosMostrados = datos.slice();

        mensajeCarga.textContent = "";

        cargarCategorias(listaProductos);
        mostrarProductos(productosMostrados);
        cargarCarrito();

        mostrarBannerUltimaVisita();
    } catch (error) {
        mensajeCarga.textContent = "Error al cargar los productos.";
        console.error("Error en cargarProductos:", error);
    }
}

function mostrarBannerUltimaVisita() {
    const cookieUltimaVisita = obtenerCookie("ultimaVisita");

    if (cookieUltimaVisita) {
        const fechaUltimaVisita = new Date(cookieUltimaVisita);
        const fechaFormateada = fechaUltimaVisita.toLocaleString('es-ES', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
        const mensaje = `Bienvenido de nuevo. Tu última visita fue el ${fechaFormateada}.`;
        document.getElementById("mensaje-ultima-visita").textContent = mensaje;
        document.getElementById("banner-ultima-visita").style.display = "block";
    }

    const fechaActual = new Date();
    establecerCookie("ultimaVisita", fechaActual.toUTCString(), 30);
}

function obtenerCookie(nombre) {
    const nombreCookie = nombre + "=";
    const todasLasCookies = document.cookie.split(';');
    for (let i = 0; i < todasLasCookies.length; i++) {
        let cookie = todasLasCookies[i].trim();
        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    return "";
}

function establecerCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000)); 
    const expiracion = "expires=" + fecha.toUTCString(); 
    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/"; 
}

document.getElementById("cerrar-banner").addEventListener("click", function () {
    document.getElementById("banner-ultima-visita").style.display = "none"; 
});

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";
        return;
    }

    productos.forEach(function (producto) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> ${producto.precio} €</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <button class="añadir-carrito" data-id="${producto.id}">Añadir al carrito</button>
        `;

        contenedor.appendChild(tarjeta);
    });

    const botonesAñadir = document.querySelectorAll('.añadir-carrito');
    botonesAñadir.forEach(boton => {
        boton.addEventListener('click', function () {
            const productoId = this.getAttribute('data-id');
            añadirAlCarrito(productoId);
        });
    });
}

function cargarCategorias(productos) {
    const selectCategorias = document.getElementById("filtro-categorias");

    selectCategorias.innerHTML = "";

    const opcionTodas = document.createElement("option");
    opcionTodas.value = "Todas";
    opcionTodas.textContent = "Todas";
    selectCategorias.appendChild(opcionTodas);

    const categoriasUnicas = [...new Set(productos.map(p => (p.categoria || "").trim()))];

    categoriasUnicas.forEach(function (categoria) {
        if (categoria === "") return;
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        selectCategorias.appendChild(opcion);
    });
}

document.getElementById("filtro-categorias").addEventListener("change", function () {
    const categoriaSeleccionada = this.value ? this.value.trim() : "Todas";

    if (categoriaSeleccionada === "Todas" || categoriaSeleccionada === "") {
        productosMostrados = listaProductos.slice();
    } else {
        productosMostrados = listaProductos.filter(function (producto) {
            const categoriaProducto = (producto.categoria || "").trim();
            return categoriaProducto === categoriaSeleccionada;
        });
    }

    mostrarProductos(productosMostrados);
});

document.getElementById("boton-ordenar-menor").addEventListener("click", function () {
    const productosOrdenados = productosMostrados.slice().sort(function (a, b) {
        return a.precio - b.precio;
    });

    productosMostrados = productosOrdenados.slice();
    mostrarProductos(productosOrdenados);
});

document.getElementById("boton-ordenar-mayor").addEventListener("click", function () {
    const productosOrdenados = productosMostrados.slice().sort(function (a, b) {
        return b.precio - a.precio;
    });

    productosMostrados = productosOrdenados.slice();
    mostrarProductos(productosOrdenados);
});

function añadirAlCarrito(productoId) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id: productoId, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargarCarrito();
}

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    carrito.forEach(item => {
        const producto = listaProductos.find(p => p.id == item.id);
        const productoCarrito = document.createElement("div");
        productoCarrito.className = "producto-carrito";
        productoCarrito.innerHTML = `
            <p>${producto.nombre} - ${item.cantidad} x ${producto.precio} €</p>
        `;
        contenedorCarrito.appendChild(productoCarrito);
    });
}

document.getElementById("vaciar-carrito").addEventListener("click", function () {
    localStorage.removeItem("carrito");
    cargarCarrito();
});

cargarProductos();

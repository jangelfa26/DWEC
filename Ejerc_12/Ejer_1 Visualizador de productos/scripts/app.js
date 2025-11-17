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
    } catch (error) {
        mensajeCarga.textContent = "Error al cargar los productos.";
        console.error("Error en cargarProductos:", error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (!productos || productos.length == 0) {
        contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";
        return;
    }

    productos.forEach(function(producto) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> ${producto.precio} €</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
        `;

        contenedor.appendChild(tarjeta);
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

    categoriasUnicas.forEach(function(categoria) {
        if (categoria == "") return; 
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        selectCategorias.appendChild(opcion);
    });
}

document.getElementById("filtro-categorias").addEventListener("change", function() {
    const categoriaSeleccionada = this.value ? this.value.trim() : "Todas";

    if (categoriaSeleccionada == "Todas" || categoriaSeleccionada == "") {
        productosMostrados = listaProductos.slice();
    } else {
        productosMostrados = listaProductos.filter(function(producto) {
            const categoriaProducto = (producto.categoria || "").trim();
            return categoriaProducto == categoriaSeleccionada;
        });
    }

    mostrarProductos(productosMostrados);
});

document.getElementById("boton-ordenar-menor").addEventListener("click", function() {
    const productosOrdenados = productosMostrados.slice().sort(function(a, b) {
        return a.precio - b.precio;
    });

    productosMostrados = productosOrdenados.slice();
    mostrarProductos(productosOrdenados);
});

document.getElementById("boton-ordenar-mayor").addEventListener("click", function() {
    const productosOrdenados = productosMostrados.slice().sort(function(a, b) {
        return b.precio - a.precio;
    });

    productosMostrados = productosOrdenados.slice();
    mostrarProductos(productosOrdenados);
});

cargarProductos();

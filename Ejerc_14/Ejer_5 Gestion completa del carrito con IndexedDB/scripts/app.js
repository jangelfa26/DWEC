document.addEventListener("DOMContentLoaded", function() {
    let listaProductos = [];
    let productosMostrados = [];

    async function cargarProductos() {
        const mensajeCarga = document.getElementById("mensaje-carga");

        try {
            mensajeCarga.textContent = "Cargando...";
            const db = await abrirBaseDeDatos();
            const productosEnBD = await obtenerProductosDeIndexedDB(db);

            if (productosEnBD.length > 0) {
                listaProductos = productosEnBD;
                productosMostrados = productosEnBD;
                console.log("Productos cargados desde IndexedDB");
            } else {
                const respuesta = await fetch("../data/productos.json");
                if (!respuesta.ok) {
                    throw new Error("Respuesta de red no OK: " + respuesta.status);
                }

                const datos = await respuesta.json();
                listaProductos = datos.slice();
                productosMostrados = datos.slice();

                await guardarProductosEnIndexedDB(db, listaProductos);
                console.log("Productos cargados desde el servidor y guardados en IndexedDB");
            }

            mensajeCarga.textContent = "";
            cargarCategorias(listaProductos);
            mostrarProductos(productosMostrados);
            cargarCarrito();
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
                <button class="añadir-carrito" data-id="${producto.id}">Añadir al carrito</button>
            `;

            contenedor.appendChild(tarjeta);
        });

        const botonesAñadir = document.querySelectorAll('.añadir-carrito');
        botonesAñadir.forEach(boton => {
            boton.addEventListener('click', function() {
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

    document.getElementById("vaciar-carrito").addEventListener("click", function() {
        localStorage.removeItem("carrito");
        cargarCarrito();
    });

    async function abrirBaseDeDatos() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('tiendaDB', 1);

            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('productos')) {
                    db.createObjectStore('productos', { keyPath: 'id' });
                }
            };

            request.onsuccess = function(event) {
                resolve(event.target.result);
            };

            request.onerror = function(event) {
                reject('Error al abrir la base de datos');
            };
        });
    }

    async function obtenerProductosDeIndexedDB(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['productos'], 'readonly');
            const store = transaction.objectStore('productos');
            const request = store.getAll();

            request.onsuccess = function() {
                resolve(request.result);
            };

            request.onerror = function() {
                reject('Error al obtener los productos');
            };
        });
    }

    async function guardarProductosEnIndexedDB(db, productos) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['productos'], 'readwrite');
            const store = transaction.objectStore('productos');

            productos.forEach(producto => {
                store.put(producto);
            });

            transaction.oncomplete = function() {
                resolve();
            };

            transaction.onerror = function() {
                reject('Error al guardar los productos');
            };
        });
    }

    cargarProductos();
});

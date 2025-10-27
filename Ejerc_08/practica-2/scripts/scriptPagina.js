import { productos } from "../datos/productos.js";

let inputNombre = document.getElementById("buscarNombre");
let filtrarCategoria = document.getElementById("filtrarCategoria");
let rangoPrecio = document.getElementById("precioMaximo");
let inputAscendente = document.getElementById("ascendente");
let inputDescendente = document.getElementById("descendente");
let inputNombreAZ = document.getElementById("nombreAZ");

function generarHTMLMostrarCategoriasProductos() {
    let sectionCategorias = document.getElementById("filtrarCategoria");
    let opciones = [];
    for (let i = 0; i < productos.length; i++) {
        let categoriaElemento = productos[i]["categoria"];
        if (!opciones.includes(categoriaElemento)) {
            opciones.push(categoriaElemento);
            let crearOpcion = document.createElement("option");
            crearOpcion.setAttribute("value", categoriaElemento);
            crearOpcion.textContent = categoriaElemento;
            sectionCategorias.appendChild(crearOpcion);
        }
    }
}

function filtradoOrdenacionProductos() {
    let resultado = [...productos];

    //filtro texto
    let textoProducto = inputNombre.value;
    if (textoProducto != "" && textoProducto != null && textoProducto != undefined) {
        let corregido = textoProducto.toLocaleLowerCase();
        resultado = resultado.filter(producto => producto.nombre.toLowerCase().includes(corregido));
    }

    //filtro categoria
    let categoriaSeleccionada = filtrarCategoria.value;
    if (categoriaSeleccionada != "todos") {
        resultado = resultado.filter(producto => producto.categoria == categoriaSeleccionada);
    }

    //filtro precio Maximo
    let precioMax = parseInt(rangoPrecio.value);
    if (!isNaN(precioMax)) {
        resultado = resultado.filter(producto => producto.precio <= precioMax);
    }

    //filtro orden
    if (inputAscendente.checked) {
        resultado.sort((a, b) => a.precio - b.precio);
    } else if (inputDescendente.checked) {
        resultado.sort((a, b) => b.precio - a.precio);
    } else if (inputNombreAZ.checked) {
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }


    let contenedorProductos = document.getElementById("contenedorListaProductos");
    contenedorProductos.innerHTML = "";

    if (resultado.length == 0) {
        let mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron productos";
        mensaje.classList.add("text-muted", "text-center", "fs-5", "py-4");
        contenedorProductos.appendChild(mensaje);

    } else {
        let linea = document.createElement("div");
        linea.classList.add("row", "g-4");

        for (let i = 0; i < resultado.length; i++) {
            let producto = resultado[i];

            let columna = document.createElement("div");
            columna.classList.add("col-sm-6", "col-md-4", "col-lg-3", "d-flex");

            let tarjetaProducto = document.createElement("div");
            tarjetaProducto.setAttribute("id", producto["categoria"]);
            tarjetaProducto.classList.add("card", "shadow-sm", "border-0", "text-center", "producto-card", "flex-fill");

            let imagenProducto = document.createElement("img");
            imagenProducto.setAttribute("src", producto["imagen"]);
            imagenProducto.setAttribute("alt", producto["nombre"]);
            imagenProducto.classList.add("card-img-top", "img-fluid", "p-2");
            tarjetaProducto.appendChild(imagenProducto);

            let cuerpoTarjeta = document.createElement("div");
            cuerpoTarjeta.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");

            let nombreProducto = document.createElement("h5");
            nombreProducto.textContent = producto["nombre"];
            nombreProducto.classList.add("card-title", "fw-bold");
            tarjetaProducto.appendChild(nombreProducto);

            let categoriaProducto = document.createElement("p");
            categoriaProducto.textContent = "Categoría: " + producto["categoria"];
            categoriaProducto.classList.add("card-text", "mb-1", "text-secondary");
            tarjetaProducto.appendChild(categoriaProducto);

            let precioProducto = document.createElement("p");
            precioProducto.textContent = "Precio: " + producto["precio"] + " €";
            precioProducto.classList.add("card-text", "fw-bold", "text-success", "mb-2");
            tarjetaProducto.appendChild(precioProducto);

            tarjetaProducto.appendChild(cuerpoTarjeta);
            columna.appendChild(tarjetaProducto);
            linea.appendChild(columna);


        }
        contenedorProductos.appendChild(linea);
    }
}

function añadirListaProductos() {
    let contenedorProductos = document.getElementById("contenedorListaProductos");
    contenedorProductos.innerHTML = "";
    let linea = document.createElement("div");
    linea.classList.add("row", "g-4");

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];

        let columna = document.createElement("div");
        columna.classList.add("col-sm-6", "col-md-4", "col-lg-3", "d-flex");

        //div contenedor
        let tarjetaProducto = document.createElement("div");
        tarjetaProducto.setAttribute("id", producto["categoria"]);
 tarjetaProducto.classList.add("card", "shadow-sm", "border-0", "text-center", "producto-card", "flex-fill");
        tarjetaProducto.style.width = "180px";


        // imagen
        let imagenProducto = document.createElement("img");
        imagenProducto.setAttribute("src", producto["imagen"]);
        imagenProducto.setAttribute("alt", producto["nombre"]);
        imagenProducto.classList.add("card-img-top", "img-fluid", "p-2");
        tarjetaProducto.appendChild(imagenProducto);

        let cuerpoTarjeta = document.createElement("div");
        cuerpoTarjeta.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");

        // nombre de producto
        let nombreProducto = document.createElement("h5");
        nombreProducto.textContent = producto["nombre"];
                nombreProducto.classList.add("card-title", "fw-bold");
        tarjetaProducto.appendChild(nombreProducto);

        //categoria
        let categoriaProducto = document.createElement("p");
        categoriaProducto.textContent = "categoria: " + producto["categoria"];
                categoriaProducto.classList.add("card-text", "text-secondary", "mb-1");
        tarjetaProducto.appendChild(categoriaProducto);

        // precio
        let precioProducto = document.createElement("p");
        precioProducto.textContent = "Precio: " + producto["precio"] + " €";
                precioProducto.classList.add("card-text", "text-success", "fw-bold");
        tarjetaProducto.appendChild(precioProducto);

                tarjetaProducto.appendChild(cuerpoTarjeta);
        columna.appendChild(tarjetaProducto);
        linea.appendChild(columna);



    }
            contenedorProductos.appendChild(linea);
}

//listeners

inputNombre.addEventListener("input", () => {
    filtradoOrdenacionProductos()
})

filtrarCategoria.addEventListener("change", () => {
    filtradoOrdenacionProductos()
})

rangoPrecio.addEventListener("input", () => {
    filtradoOrdenacionProductos()
})

inputAscendente.addEventListener("change", () => {
    filtradoOrdenacionProductos()
})

inputDescendente.addEventListener("change", () => {
    filtradoOrdenacionProductos()
})

inputNombreAZ.addEventListener("change", () => {
    filtradoOrdenacionProductos()
})




generarHTMLMostrarCategoriasProductos();
añadirListaProductos();
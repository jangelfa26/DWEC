const listaProductos = document.getElementById("product-list");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroMarca = document.getElementById("filtro-marca");
const ordenPrecio = document.getElementById("orden-precio");
const mensaje = document.getElementById("mensaje");

let productos = [];
let productosFiltrados = [];

function mostrarProductos(lista) {
  listaProductos.innerHTML = "";
  if (lista.length == 0) {
    listaProductos.innerHTML = "<p class='text-center text-muted'>No hay productos para mostrar.</p>";
    return;
  }

  lista.forEach(function(producto) {
    let card = document.createElement("div");
    card.classList.add("col-md-4");

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${producto.imageUrl}" class="card-img-top" alt="${producto.name}">
        <div class="card-body">
          <h5 class="card-title">${producto.name}</h5>
          <p class="card-text">${producto.description}</p>
          <p><strong>Precio:</strong> €${producto.price.toFixed(2)}</p>
          <p><strong>Categoría:</strong> ${producto.category}</p>
          <p><strong>Marca:</strong> ${producto.brand}</p>
        </div>
      </div>
    `;
    listaProductos.appendChild(card);
  });
}

function cargarSelects(datos) {
  let categorias = [...new Set(datos.map(p => p.category))];
  let marcas = [...new Set(datos.map(p => p.brand))];

  categorias.forEach(function(cat) {
    let opcion = document.createElement("option");
    opcion.value = cat;
    opcion.textContent = cat;
    filtroCategoria.appendChild(opcion);
  });

  marcas.forEach(function(marca) {
    let opcion = document.createElement("option");
    opcion.value = marca;
    opcion.textContent = marca;
    filtroMarca.appendChild(opcion);
  });
}

function aplicarFiltrosYOrden() {
  productosFiltrados = productos.filter(function(p) {
    let coincideCategoria = filtroCategoria.value == "" || p.category == filtroCategoria.value;
    let coincideMarca = filtroMarca.value == "" || p.brand == filtroMarca.value;
    return coincideCategoria && coincideMarca;
  });

  if (ordenPrecio.value == "asc") {
    productosFiltrados.sort((a, b) => a.price - b.price);
  } else if (ordenPrecio.value == "desc") {
    productosFiltrados.sort((a, b) => b.price - a.price);
  }

  mostrarProductos(productosFiltrados);
}

function cargarProductos() {
  fetch("../datos/products.json")
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error("Error al cargar los productos");
      }
      return respuesta.json();
    })
    .then(datos => {
      productos = datos;
      productosFiltrados = [...productos];
      cargarSelects(productos);
      mostrarProductos(productos);
    })
    .catch(error => {
      mensaje.innerHTML = `<div class='alert alert-danger'>${error.message}</div>`;
    });
}

filtroCategoria.addEventListener("change", aplicarFiltrosYOrden);
filtroMarca.addEventListener("change", aplicarFiltrosYOrden);
ordenPrecio.addEventListener("change", aplicarFiltrosYOrden);

cargarProductos();

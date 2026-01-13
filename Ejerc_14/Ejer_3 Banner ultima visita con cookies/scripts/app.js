const nombre = document.querySelector("#nombre");
const sku = document.querySelector("#sku");
const precio = document.querySelector("#precio");
const stock = document.querySelector("#stock");
const categoria = document.querySelector("#categoria");

const errorNombre = document.querySelector("#errorNombre");
const errorSku = document.querySelector("#errorSku");
const errorPrecio = document.querySelector("#errorPrecio");
const errorStock = document.querySelector("#errorStock");
const errorCategoria = document.querySelector("#errorCategoria");

const estadoSku = document.querySelector("#estadoSku");

const btnGuardar = document.querySelector("#btnGuardar");
const mensajeExito = document.querySelector("#mensajeExito");

let skuDisponible = false;

function validarCampos() {
    let valido = true;

    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio";
        valido = false;
    } else {
        errorNombre.textContent = "";
    }

    if (sku.value.trim().length < 5) {
        errorSku.textContent = "Mínimo 5 caracteres";
        valido = false;
    } else {
        errorSku.textContent = "";
    }

    const precioValor = parseFloat(precio.value);
    if (isNaN(precioValor) || precioValor <= 0) {
        errorPrecio.textContent = "Introduce un precio válido (> 0)";
        valido = false;
    } else {
        errorPrecio.textContent = "";
    }

    const stockValor = parseInt(stock.value);
    if (isNaN(stockValor) || stockValor < 0) {
        errorStock.textContent = "El stock debe ser 0 o mayor";
        valido = false;
    } else {
        errorStock.textContent = "";
    }

    if (categoria.value.trim() === "") {
        errorCategoria.textContent = "La categoría es obligatoria";
        valido = false;
    } else {
        errorCategoria.textContent = "";
    }

    btnGuardar.disabled = !(valido && skuDisponible);
}

[nombre, sku, precio, stock, categoria].forEach(campo => {
    campo.addEventListener("input", validarCampos);
});

async function validarSku(skuTexto) {
    estadoSku.textContent = "Validando SKU...";
    estadoSku.style.color = "blue";

    const res = await fetch("../data/productos.json");
    const productos = await res.json();

    const existe = productos.some(p => p.sku === skuTexto);

    if (existe) {
        estadoSku.textContent = "El SKU ya existe";
        estadoSku.style.color = "red";
        skuDisponible = false;
    } else {
        estadoSku.textContent = "SKU disponible";
        estadoSku.style.color = "green";
        skuDisponible = true;
    }

    validarCampos();
}

sku.addEventListener("blur", () => {
    if (sku.value.trim().length >= 5) {
        validarSku(sku.value.trim());
    }
});

const form = document.querySelector("#formProducto");

form.addEventListener("submit", evt => {
    evt.preventDefault();

    mensajeExito.textContent = `Producto "${nombre.value}" guardado correctamente.`;

    form.reset();
    estadoSku.textContent = "";
    skuDisponible = false;
    validarCampos();
});

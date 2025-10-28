import { actividades } from "../datos/actividades.js";

let itinerario = [];
let selectorDestino = document.getElementById("destinoFormulario");
let inputPrecioMaximo = document.getElementById("precioMaximo");
let contenedorActividades = document.getElementById("columna2ActividadesDisponibles");

function mostrarActividades(listaActividades) {
    contenedorActividades.innerHTML = "<h2>Actividades Disponibles</h2>";
    listaActividades.forEach(actividadIndividual => {
        let tarjetaActividad = document.createElement("div");
        tarjetaActividad.classList.add("card", "mb-3", "p-2");
        let imagenActividad = document.createElement("img");
        imagenActividad.src = actividadIndividual.imagen;
        imagenActividad.alt = actividadIndividual.nombre;
        imagenActividad.classList.add("card-img-top");
        imagenActividad.style.height = "150px";
        tarjetaActividad.appendChild(imagenActividad);
        let tituloActividad = document.createElement("h4");
        tituloActividad.textContent = actividadIndividual.nombre;
        tarjetaActividad.appendChild(tituloActividad);
        let destinoActividad = document.createElement("p");
        destinoActividad.textContent = "Destino: " + actividadIndividual.destino;
        tarjetaActividad.appendChild(destinoActividad);
        let tipoActividad = document.createElement("p");
        tipoActividad.textContent = "Tipo: " + actividadIndividual.tipo;
        tarjetaActividad.appendChild(tipoActividad);
        let duracionActividad = document.createElement("p");
        duracionActividad.textContent = "Duración: " + actividadIndividual.duracionHoras + " h";
        tarjetaActividad.appendChild(duracionActividad);
        let precioActividad = document.createElement("p");
        precioActividad.textContent = "Precio: " + actividadIndividual.precio + " €";
        tarjetaActividad.appendChild(precioActividad);
        let botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Añadir al Itinerario";
        botonAgregar.classList.add("btn", "btn-success", "btn-sm");
        botonAgregar.addEventListener("click", function() {
            agregarAlItinerario(actividadIndividual);
        });
        tarjetaActividad.appendChild(botonAgregar);
        contenedorActividades.appendChild(tarjetaActividad);
    });
}

function cargarDestinosFiltro(actividadesTotales) {
    let destinosUnicos = [];
    actividadesTotales.forEach(actividadLista => {
        if (!destinosUnicos.includes(actividadLista.destino)) {
            destinosUnicos.push(actividadLista.destino);
            let opcionDestino = document.createElement("option");
            opcionDestino.value = actividadLista.destino;
            opcionDestino.textContent = actividadLista.destino;
            selectorDestino.appendChild(opcionDestino);
        }
    });
}

function filtrarActividades() {
    let destinoSeleccionado = selectorDestino.value;
    let tiposSeleccionados = Array.from(document.querySelectorAll("input[name='tipoActividad']:checked")).map(input => input.id);
    let precioMaximoSeleccionado = inputPrecioMaximo.value;
    let actividadesFiltradas = actividades.filter(actividadFiltro => {
        let coincideDestino = destinoSeleccionado === "todos" || actividadFiltro.destino === destinoSeleccionado;
        let coincideTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(actividadFiltro.tipo);
        let coincidePrecio = actividadFiltro.precio <= precioMaximoSeleccionado;
        return coincideDestino && coincideTipo && coincidePrecio;
    });
    mostrarActividades(actividadesFiltradas);
}

function agregarAlItinerario(actividadSeleccionada) {
    if (!itinerario.find(elemento => elemento.id === actividadSeleccionada.id)) {
        itinerario.push(actividadSeleccionada);
        actualizarItinerario();
    }
}

function quitarDelItinerario(idActividad) {
    itinerario = itinerario.filter(elemento => elemento.id !== idActividad);
    actualizarItinerario();
}

function actualizarItinerario() {
    let contenedorResumen = document.getElementById("resumenItinerario");
    contenedorResumen.innerHTML = "<h3>Itinerario</h3>";
    let totalCoste = 0;
    let totalDuracion = 0;
    itinerario.forEach(actividadItinerario => {
        let elementoActividad = document.createElement("div");
        elementoActividad.textContent = `${actividadItinerario.nombre} - ${actividadItinerario.precio} €`;
        let botonQuitar = document.createElement("button");
        botonQuitar.textContent = "Quitar";
        botonQuitar.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        botonQuitar.addEventListener("click", function() {
            quitarDelItinerario(actividadItinerario.id);
        });
        elementoActividad.appendChild(botonQuitar);
        contenedorResumen.appendChild(elementoActividad);
        totalCoste += actividadItinerario.precio;
        totalDuracion += actividadItinerario.duracionHoras;
    });
    let resumenFinal = document.createElement("p");
    resumenFinal.innerHTML = `<strong>Coste Total:</strong> ${totalCoste} € <br> <strong>Duración Total:</strong> ${totalDuracion} h <br> <strong>Nº Actividades:</strong> ${itinerario.length}`;
    contenedorResumen.appendChild(resumenFinal);
    let bloqueSeguro = document.getElementById("bloqueSeguro");
    let checkboxSeguro = document.getElementById("seguroViajeReserva");
    if (totalCoste > 1000) {
        bloqueSeguro.style.display = "block";
        checkboxSeguro.required = true;
    } else {
        bloqueSeguro.style.display = "none";
        checkboxSeguro.required = false;
    }
}

function validarFormulario(evento) {
    evento.preventDefault();
    let errores = [];
    let bloqueErrores = document.getElementById("bloqueErrores");
    bloqueErrores.innerHTML = "";
    let nombre = document.getElementById("nombreReserva").value.trim();
    let email = document.getElementById("emailReserva").value.trim();
    let fechaInicio = document.getElementById("fechaInicioReserva").value;
    let codigoDescuento = document.getElementById("codigoDescuentoReserva").value.trim();
    let seguroViaje = document.getElementById("seguroViajeReserva");
    if (itinerario.length === 0) {
        errores.push("Debe seleccionar al menos una actividad en el itinerario.");
    }
    if (nombre === "") {
        errores.push("Debe ingresar su nombre completo.");
    }
    if (email === "" || !email.includes("@")) {
        errores.push("Debe ingresar un correo electrónico válido.");
    }
    if (fechaInicio === "" || new Date(fechaInicio) < new Date()) {
        errores.push("La fecha de inicio no puede ser una fecha pasada.");
    }
    if (codigoDescuento !== "" && !/^[A-Z]{4}\d{2}$/.test(codigoDescuento)) {
        errores.push("El código de descuento debe tener 4 letras y 2 números (ej: ABCD25).");
    }
    if (seguroViaje.required && !seguroViaje.checked) {
        errores.push("Debe aceptar el seguro de viaje si el coste total supera los 1000 €.");
    }
    if (errores.length > 0) {
        errores.forEach(mensaje => {
            let parrafoError = document.createElement("p");
            parrafoError.textContent = mensaje;
            bloqueErrores.appendChild(parrafoError);
        });
    } else {
        alert("Reserva confirmada con éxito.");
        evento.target.reset();
        itinerario = [];
        actualizarItinerario();
    }
}

selectorDestino.addEventListener("change", () => {
filtrarActividades();
});

inputPrecioMaximo.addEventListener("input",() => {
    filtrarActividades();
});
document.querySelectorAll("input[name='tipoActividad']").forEach(inputTipo => {
    inputTipo.addEventListener("change", () => {
    filtrarActividades();
});
});
document.getElementById("formularioReserva").addEventListener("submit", (event) =>{
    validarFormulario(event);
});
mostrarActividades(actividades);
cargarDestinosFiltro(actividades);

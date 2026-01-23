function crearFecha(valor) {
    if (typeof valor === "number") return new Date(valor);
    if (typeof valor === "string") return new Date(valor);
    if (typeof valor === "object" && valor.año && valor.mes && valor.dia) {
        return new Date(valor.año, valor.mes - 1, valor.dia);
    }
    return null;
}

async function cargarEventos() {
    try {
        const response = await fetch('../data/eventos.json');
        const eventos = await response.json();

        const eventosConFecha = eventos.map(evento => ({
            titulo: evento.nombre,
            descripcion: evento.descripcion,
            fecha: crearFecha(evento.fecha)
        }));

        eventosConFecha.sort((a, b) => a.fecha - b.fecha);

        eventosConFecha.forEach(evento => {
            const contador = crearEvento(evento);
            actualizarContador(evento, contador); // Llamamos para iniciar el contador desde el principio
        });
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
    }
}

function hoySinHora() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return hoy.getTime();
}

function formatearTiempo(ms) {
    if (ms <= 0) return null;

    const totalSegundos = Math.floor(ms / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${dias}d ${horas.toString().padStart(2, "0")}h ${minutos.toString().padStart(2, "0")}m ${segundos.toString().padStart(2, "0")}s`;
}

function crearEvento(evento) {
    const card = document.createElement("div");
    card.className = "card";

    const contador = document.createElement("div");
    contador.className = "contador";

    const input = document.createElement("input");
    input.placeholder = "Días a sumar o restar";
    input.type = "number";

    const boton = document.createElement("button");
    boton.textContent = "Posponer";

    boton.onclick = () => {
        const dias = Number(input.value);
        if (!isNaN(dias)) {
            const nuevaFecha = new Date(evento.fecha); // Utilizamos la fecha original del evento
            nuevaFecha.setDate(nuevaFecha.getDate() + dias); // Sumamos o restamos los días
            evento.fecha = nuevaFecha; // Actualizamos la fecha del evento
            input.value = ""; // Limpiamos el campo de entrada
            actualizarContador(evento, contador); // Actualizamos el contador inmediatamente
        }
    };

    card.innerHTML = `
        <h2>${evento.titulo}</h2>
        <p>${evento.descripcion}</p>
        <div class="fecha">Fecha: ${evento.fecha.toLocaleDateString()}</div>
    `;

    const acciones = document.createElement("div");
    acciones.className = "acciones";
    acciones.appendChild(input);
    acciones.appendChild(boton);

    card.appendChild(contador);
    card.appendChild(acciones);

    document.getElementById("eventos").appendChild(card);

    return contador;
}

function actualizarContador(evento, contador) {
    // Cada evento tendrá su propio setInterval, de manera independiente
    const intervalo = setInterval(() => {
        const ahora = Date.now(); // Tomamos la fecha actual
        const diferencia = evento.fecha.getTime() - ahora;
        const tiempo = formatearTiempo(diferencia);

        if (tiempo === null) {
            contador.textContent = "FINALIZADO";
            contador.classList.add("finalizado");
            clearInterval(intervalo);  // Detenemos el contador si el evento está finalizado
        } else {
            contador.textContent = tiempo;
            contador.classList.remove("finalizado");
        }
    }, 1000);
}

cargarEventos();

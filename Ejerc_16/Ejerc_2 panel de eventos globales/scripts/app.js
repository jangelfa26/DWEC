function crearFecha(valor) {
    if (typeof valor === "number") return new Date(valor);
    if (typeof valor === "string") return new Date(valor);
    if (Array.isArray(valor)) return new Date(valor[0], valor[1] - 1, valor[2]);
    return null;
}

const eventos = [
    {
        titulo: "Congreso de IA Oviedo",
        descripcion: "Evento inaugural del año en la ciudad.",
        fecha: crearFecha([2026, 1, 15])
    },
    {
        titulo: "Actualización de Seguridad Q1",
        descripcion: "Timestamp equivalente al 1 de marzo de 2026.",
        fecha: crearFecha(new Date(2026, 2, 1).getTime())
    },
    {
        titulo: "Vacaciones de Semana Santa",
        descripcion: "Abril (Mes 3). Inicio de temporada alta.",
        fecha: crearFecha("2026-04-01")
    },
    {
        titulo: "Cena de Navidad Empresa",
        descripcion: "Diciembre (Mes 11). Ubicación por confirmar.",
        fecha: crearFecha("2026-12-18")
    },
    {
        titulo: "Fin de Año 2026",
        descripcion: "Último evento del calendario actual.",
        fecha: crearFecha([2026, 12, 31])
    },
    {
        titulo: "Revisión de Código Pasada",
        descripcion: "Evento que ya debería aparecer como 'Finalizado'.",
        fecha: crearFecha("2026-01-05")
    }
];

eventos.sort((a, b) => a.fecha - b.fecha);

const contenedor = document.getElementById("eventos");

function formatearTiempo(ms) {
    if (ms <= 0) return null;

    const totalSegundos = Math.floor(ms / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${dias}d ${horas.toString().padStart(2,"0")}h ${minutos.toString().padStart(2,"0")}m ${segundos.toString().padStart(2,"0")}s`;
}

function crearEvento(evento) {
    const card = document.createElement("div");
    card.className = "card";

    const contador = document.createElement("div");
    contador.className = "contador";

    const input = document.createElement("input");
    input.placeholder = "Días a sumar";
    input.type = "number";

    const boton = document.createElement("button");
    boton.textContent = "Posponer";

    boton.onclick = () => {
        const dias = Number(input.value);
        if (!isNaN(dias)) {
            evento.fecha.setDate(evento.fecha.getDate() + dias);
            input.value = "";
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
    contenedor.appendChild(card);

    return contador;
}

const contadores = eventos.map(crearEvento);

setInterval(() => {
    const ahora = Date.now();

    contadores.forEach((contador, i) => {
        const diferencia = eventos[i].fecha - ahora;
        const tiempo = formatearTiempo(diferencia);

        if (tiempo === null) {
            contador.textContent = "FINALIZADO";
            contador.classList.add("finalizado");
        } else {
            contador.textContent = tiempo;
            contador.classList.remove("finalizado");
        }
    });
}, 1000);

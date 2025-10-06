let tarjetas = document.querySelectorAll(".card");

tarjetas.forEach(tarjeta => {
    let duracion = document.createElement("p");
    duracion.className = "duracion";
    duracion.textContent = "Duracion: 20 horas";

    tarjeta.querySelector(".info").appendChild(duracion);
})
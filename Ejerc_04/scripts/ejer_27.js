let cursos = document.querySelectorAll(".card:not(.premium)");

cursos.forEach(tarjeta => {
    tarjeta.style.border = "2px dotted black";
})
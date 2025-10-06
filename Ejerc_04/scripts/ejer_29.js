let enlaces  = document.querySelectorAll(".navegacion a");
enlaces.forEach(enlace => {
    enlace.setAttribute("data-tipo", "enlace-nav");
})
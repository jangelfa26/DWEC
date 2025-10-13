let botones = document.querySelectorAll("button");
let pestañas = document.querySelectorAll(".pestaña");
let numeroBotones = 1;
botones.forEach(boton => {
    boton.textContent = `Pestaña  ${numeroBotones}`;
    boton.setAttribute("data-id", numeroBotones);    
    numeroBotones++;
    boton.addEventListener("click", () => {
        pestañas.forEach(pestaña => {
            if(!pestaña.classList.contains("oculto")){
                pestaña.setAttribute("class", "oculto");
            }
        })

        let idBoton = boton.getAttribute("data-id")
        let pestañaMostrar = document.querySelector(`#pestaña-${idBoton}`);
        pestañaMostrar.classList.remove("oculto");


    })
});


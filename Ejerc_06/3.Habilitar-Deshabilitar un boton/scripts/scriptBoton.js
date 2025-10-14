let inputTerminos = document.getElementById("aceptaTerminos");

inputTerminos.addEventListener("change", () => {
    let botonEnviar = document.getElementById("botonSiguiente");
    botonEnviar.disabled = !inputTerminos.checked;

})
let botonMostrar = document.getElementById("botonMostrar");
let botonCerrar = document.getElementById("botonCerrar");
let ventanaModal = document.getElementById("ventana");

botonMostrar.addEventListener("click", () => {
    ventanaModal.style.display = "block";

})

botonCerrar.addEventListener("click", () =>{
    ventanaModal.style.display = "none";
})
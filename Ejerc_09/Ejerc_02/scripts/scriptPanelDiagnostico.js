let viewportSpan = document.getElementById("viewportSize");
let tamañoTotalViewportSpan = document.getElementById("windowSize");
let posicionVentanaSpan = document.getElementById("windowPosition");
let resolucionPantallaSpan = document.getElementById("screenResolution");
let espacioDisponiblePantallaSpan = document.getElementById("screenAvail");
let estadoConexion = document.getElementById("connectionStatus");

let bolaConexion = document.getElementById("estado");

function actualizarContenidos() {
    let tamañoViewport = `Ancho: ${window.innerWidth} --- Alto: ${window.innerHeight}`;
    viewportSpan.textContent = tamañoViewport;

    let tamañoTotalViewport = `Ancho: ${window.outerWidth} --- Alto: ${window.outerHeight}`;
    tamañoTotalViewportSpan = tamañoTotalViewport;

    let posicionVentana = `posicion X: ${window.screenX} --- posicion Y: ${window.screenY}`;
    posicionVentanaSpan.textContent = posicionVentana;

    let resolucionPantalla = ` ${window.screen.width} X ${window.screen.height}`;
    resolucionPantallaSpan.textContent = resolucionPantalla;

    let espacioDisponible = ` ${window.screen.availWidth} X ${window.screen.availHeight}`;
    espacioDisponiblePantallaSpan.textContent = espacioDisponible;

    let estado;
    if(navigator.onLine == true){
        estado = "online";
        bolaConexion.classList = "";
        bolaConexion.classList = "online";

    }else{
        estado = "offline";
        bolaConexion.classList = "";
        bolaConexion.classList = "offline";
    }
    estadoConexion.textContent = estado;

}

actualizarContenidos();

window.addEventListener("resize", ()=>{
    actualizarContenidos();
})


window.addEventListener("move", ()=>{
    actualizarContenidos();
})


window.addEventListener("online", ()=>{
    actualizarContenidos();
})


window.addEventListener("offline", ()=>{
    actualizarContenidos();
})
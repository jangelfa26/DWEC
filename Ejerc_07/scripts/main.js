document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
    let contenedorExterior = document.getElementById("outer-box");
    contenedorExterior.addEventListener("click", (event) =>{
        let contenedorSeleccionado = event.target;
        let elementoGestion = event.currentTarget;
        if (contenedorSeleccionado.id != "middle-box") {
        contenedorSeleccionado.style.backgroundColor = "coral";
        console.log(contenedorSeleccionado.id);
        console.log(elementoGestion.id);    
        }
        
        
    })
    let middleBox = document.getElementById("middle-box");
    middleBox.addEventListener("click", (event) =>{
        let contendorSeleccionado = event.target;
        let elementoGestion = event.currentTarget;
        if (contendorSeleccionado.id == "middle-box") {
            event.stopPropagation();
            middleBox.style.backgroundColor = "coral";

            console.log(contendorSeleccionado.id);
            console.log(elementoGestion.id);
        }
        
        

    })

    // --- Solución Ejercicio 2 ---
    let enlace = document.getElementById("test-link");
    enlace.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Navegación interrumpida");
    })

    // --- Solución Ejercicio 3 ---
    let botonVolverArriba = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        let pxScroll = window.scrollY;

        if(pxScroll > 250){
            botonVolverArriba.removeAttribute("class");
        }else{
            botonVolverArriba.setAttribute("class", "hidden");
        }
    })
    botonVolverArriba.addEventListener("click", ()=>{
        window.scrollTo(0,0);
    })
    // --- Solución Ejercicio 5 ---
    let botonNotificacion = document.getElementById("notification-btn");
    let areaNotificacion = document.getElementById("notification-area");


    botonNotificacion.addEventListener("click", ()=>{
    const fecha = new Date().toISOString();
    const eventoNotification = new CustomEvent( 'notification', {
        detail: {
            mensaje: 'mensaje ejemplo - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis, felis eget sagittis blandit, lorem.',
            fecha: fecha
            }
        })

        document.dispatchEvent(eventoNotification);
    });

    document.addEventListener("notification", (event) => {
        let añadirNotificacion = document.createElement("div");
        añadirNotificacion.setAttribute("id", "notificacion");
        
        console.log(añadirNotificacion);

        let tituloNotificacion = document.createElement("h3");
        tituloNotificacion.textContent = "Notificacion";
        
        añadirNotificacion.appendChild(tituloNotificacion);

        let mensaje = document.createElement("p");
        mensaje.textContent = event.detail.mensaje;

        añadirNotificacion.appendChild(mensaje);

        let fechaBloque = document.createElement("p");
        fechaBloque.textContent = event.detail.fecha;

        añadirNotificacion.appendChild(fechaBloque);
        areaNotificacion.appendChild(añadirNotificacion);

    })
    

});

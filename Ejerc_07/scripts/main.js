document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
    let contenedorExterior = document.getElementById("outer-box");
    contenedorExterior.addEventListener("click", (event) =>{
        let contendorSeleccionado = event.target;
        let elementoGestion = event.currentTarget;
        if (contendorSeleccionado.id == "middle-box") {
        contendorSeleccionado.style.backgroundColor = "red";
        event.stopPropagation();    
        } else {
        contendorSeleccionado.style.backgroundColor = "coral";
        }
        console.log(contendorSeleccionado.id);
        console.log(elementoGestion.id);
        // revisar lo que piden en el ejercicio 4, no muy claro si esta correcto
    })

    // --- Solución Ejercicio 2 ---
    let enlace = document.getElementById("test-link");
    enlace.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Navegación interrumpida");
    })

    // --- Solución Ejercicio 3 ---
    window.addEventListener("scroll", () => {
        let botonVolverArriba = document.querySelector(".hidden");
        let pxScroll = window.scrollY;
        console.log(pxScroll);
        
        if(pxScroll > 250){
            botonVolverArriba.style.visibility = "visible";
            botonVolverArriba.addEventListener("click", ()=>{
                window.scrollTo(0,0);
            })
        }

    })

    // --- Solución Ejercicio 5 ---

});

let contenedorColores = document.getElementById("colores");
let cuerpo = document.body;

contenedorColores.addEventListener("click", (event) => {
    let ColorClicado = event.target;
    let claseColorClicado = ColorClicado.classList[0];
    switch (claseColorClicado) {
        case "rojo": 
            cuerpo.style.backgroundColor = "#FF0000";
            break;

        case "verde": 
            cuerpo.style.backgroundColor = "#008F39";
            break;

        case "amarillo": 
            cuerpo.style.backgroundColor = "#FFFF00";
            break;

        case "azul": 
            cuerpo.style.backgroundColor = "#0000FF";
            break;
        
        case "morado": 
            cuerpo.style.backgroundColor = "#800080";
            break;    

        default:
            cuerpo.style.backgroundColor = "#FFFFF";
            break;
    }
})
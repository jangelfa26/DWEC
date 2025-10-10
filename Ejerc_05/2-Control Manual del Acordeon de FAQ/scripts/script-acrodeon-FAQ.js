function ocultarTodasLasRespuestas() {
    let respuestas = document.getElementsByTagName("p");

    for (let i = 0; i < respuestas.length; i++) {
        let respuesta = respuestas[i];
        let atributo = respuesta.getAttribute("class");
        if(!atributo || atributo.textContent != "oculto"){
            respuesta.setAttribute("class", "oculto");
        }
        
    }


}

function revelarRespuesta(h2) {
    ocultarTodasLasRespuestas();
    let elementos = document.getElementsByTagName("h2");
    
    for(let i = 0; i<elementos.length; i++){
        if(elementos[i].textContent == h2){
            let pregunta = elementos[i];
            let oculto = pregunta.nextElementSibling;
            oculto.removeAttribute('class');  
        }
    }

}

let nombre = "¿Qué es CSS?";
revelarRespuesta(nombre);
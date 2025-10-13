function generarInformeDeValidacion(event) {
    event.preventDefault();
    let inputNombre = document.querySelector("#nombre").value;
    let inputEmail = document.querySelector("#email").value;


    let informe = document.querySelector("div#informe-errores"); 
    informe.replaceChildren();

    let nombreIncorrecto = false;
    let emailIncorrecto = false;
    if(inputNombre.length < 3){
        let mensaje = document.createElement("p");
        mensaje.textContent = "El nombre es incorrecto";
        informe.appendChild(mensaje);
        nombreIncorrecto = true;
    }

    if(!inputEmail.includes("@")){
        let mensaje = document.createElement("p");
        mensaje.textContent = "El email es incorrecto"
        informe.appendChild(mensaje);
        emailIncorrecto = true;
    }

    if(nombreIncorrecto == false && emailIncorrecto == false){
        let mensaje = document.createElement("p");
        mensaje.textContent = "Formukario valido";
        informe.appendChild(mensaje);
    }


}
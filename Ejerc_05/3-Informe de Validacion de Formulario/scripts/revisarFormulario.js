function generarInformeDeValidacion() {
    event.preventDefault();
    let inputNombre = document.querySelector("#nombre").value;
    let inputEmail = document.querySelector("#email").value;


    let informe = document.querySelector("div#informe-errores"); 
    informe.replaceChildren();

    let nombreIncorrecto = false;
    let emailIncorrecto = false;
    if(inputNombre.lengt < 3){
        let mensaje = "<p>El nombre es incorrecto</p>";
        informe.appendChild(mensaje);
        nombreIncorrecto = true;
    }

    if(!inputEmail.includes("@")){
        let mensaje = "<p>El nombre es incorrecto</p>";
        informe.appendChild(mensaje);
        emailIncorrecto = true;
    }

    if(nombreIncorrecto == false && emailIncorrecto == false){
        let mensaje = "<p>Formulario valido</p>";
        informe.appendChild(mensaje);
    }


}
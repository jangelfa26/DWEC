let formulario = document.querySelector("#formulario-contacto");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    let nombre = document.querySelector("#nombre").value;
    let email = document.querySelector("#email").value;
    let mensaje = document.querySelector("#mensaje").value;

    console.log(nombre);
    console.log(email);
    console.log(mensaje);

})
let titulo = document.querySelector("#lista-cursos").lastElementChild.querySelector(".info h2");
console.log(titulo);
titulo.addEventListener("click", function(){
    let textoOculto = titulo.nextElementSibling;

    textoOculto.style.display = "block";

})
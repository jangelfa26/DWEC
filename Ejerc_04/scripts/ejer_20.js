let segundoEnlace = document.querySelector(".navegacion").firstElementChild.nextElementSibling;
console.log(segundoEnlace);
let titulo = segundoEnlace.parentElement.previousElementSibling;
titulo.style.color = "orange";
console.log(titulo);
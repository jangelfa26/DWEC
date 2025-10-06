let numeroCursos = document.querySelectorAll(".card").length;
let contacto = document.querySelector(".navegacion").lastElementChild;
let texto = contacto.textContent;

contacto.textContent = texto+ " (" + numeroCursos + " Cursos)";
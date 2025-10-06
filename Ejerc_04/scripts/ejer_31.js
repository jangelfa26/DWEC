let tarjeta = document.querySelector("#lista-cursos").lastElementChild.querySelector("h2");
console.log(tarjeta);

if(tarjeta.textContent.includes('React')) {
    let parrafo = tarjeta.parentElement.querySelector(".oculto");
    parrafo.textContent += "(¡Oferta especial!)";
    parrafo.style.display = "block";
}
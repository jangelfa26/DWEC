let titulos = document.querySelectorAll(".card h2");

titulos.forEach(titulo => {
    titulo.textContent= `[CURSO] ${titulo.textContent}`;
})
let categorias = document.querySelectorAll(" .card .categoria");

categorias.forEach(categoria => {
    if (categoria.textContent == 'Desarrollo Web'){
        categoria.closest(".card").style.backgroundColor = "#f0f0f0";
    }
})
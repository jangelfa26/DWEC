let categorias = document.querySelectorAll('.card .categoria');
let lista = Array.from(categorias).map(cat => cat.textContent);
console.log(lista);

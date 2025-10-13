function filtrarPorPais(pais) {
  const lista = document.getElementById("listaCiudades");
  const elementos = lista.querySelectorAll("li");

  elementos.forEach(function(li) {
    let liCorregido = li.textContent.toLowerCase();
    let paisCorregido = pais.toLowerCase();
    if (liCorregido.includes(paisCorregido)) {
      li.style.display = "list-item"; 
    } else {
      li.style.display = "none"; 
    }
  });
}


const boton = document.getElementById("botonFiltrar");
const input = document.getElementById("filtro");

boton.addEventListener("click", () => {
  const pais = input.value; 
  filtrarPorPais(pais); 
});
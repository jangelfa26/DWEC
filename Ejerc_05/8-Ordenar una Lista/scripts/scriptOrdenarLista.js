const boton = document.getElementById("botonOrdenar");
const lista = document.getElementById("frutas");

boton.addEventListener("click", () => {
  const elementos = lista.querySelectorAll("li");
  const arrayElementos = Array.from(elementos);
  arrayElementos.sort((a, b) => a.textContent.localeCompare(b.textContent));
  lista.innerHTML = "";
  arrayElementos.forEach(li => lista.appendChild(li));
});

let input = document.getElementById("filtro");
let lista = document.getElementById("listaPaises");

input.addEventListener("input", () => {
    let texto = input.value.toLowerCase();
    
    let elementos = lista.querySelectorAll("li");
    
    elementos.forEach(li => {
        let textoCorrejido = li.textContent.toLowerCase();

        if (!textoCorrejido.includes(texto)) {
            li.style.display = "none";
        } else {
            li.style.display = "list-item";
        }
    });
});
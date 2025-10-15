let lista = document.getElementById("lista");
let elementos = lista.querySelectorAll("li");

for (let i = 0; i < elementos.length; i++) {
    let elementoLista = elementos[i];
    let subir = elementoLista.querySelector(".subir");
    let bajar = elementoLista.querySelector(".bajar");

    if (i == 0) subir.disabled = true;
    if (i == elementos.length - 1) bajar.disabled = true;

    subir.addEventListener("click", () => {
            let elementoArriba = elementoLista.previousElementSibling;
            if (elementoArriba) {
                lista.insertBefore(elementoLista, elementoArriba);
            }
            actualizar();
        });

    bajar.addEventListener("click", () => {
            let elementoAbajo = elementoLista.nextElementSibling;
            if (elementoAbajo) {
                lista.insertBefore(elementoAbajo, elementoLista);
            }
            actualizar();
        });
}

function actualizar() {
    elementos = lista.querySelectorAll("li");
    for (let i = 0; i < elementos.length; i++) {
        let elementoLista = elementos[i];
        elementoLista.querySelector(".subir").disabled = i == 0;
        elementoLista.querySelector(".bajar").disabled = i == elementos.length - 1;
    }
}

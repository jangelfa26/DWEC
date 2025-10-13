let boton = document.getElementById('generar');
let input = document.getElementById('numParrafos');
let resultado = document.getElementById('resultado');

let textoLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

boton.addEventListener('click', () => {
    let cantidad = parseInt(input.value);
    resultado.innerHTML = '';

    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < cantidad; i++) {
        let parrafo = document.createElement('p');
        parrafo.textContent = textoLorem;
        fragmento.appendChild(parrafo);
    }

    resultado.appendChild(fragmento);
});
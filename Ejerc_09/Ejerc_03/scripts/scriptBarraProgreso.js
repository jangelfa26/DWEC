const barraProgreso = document.getElementById('barra-progreso');
const botonVolverArriba = document.getElementById('volver-arriba');

function actualizarBarraProgreso() {
    const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollActual = window.scrollY;
    const porcentaje = (scrollActual / alturaTotal) * 100;
    barraProgreso.style.width = `${porcentaje}%`;

    if (scrollActual > window.innerHeight) {
        botonVolverArriba.classList.add('visible');
    } else {
        botonVolverArriba.classList.remove('visible');
    }
}

function volverArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () =>{
    actualizarBarraProgreso();
});

botonVolverArriba.addEventListener('click', () => {
    volverArriba();
});

actualizarBarraProgreso();

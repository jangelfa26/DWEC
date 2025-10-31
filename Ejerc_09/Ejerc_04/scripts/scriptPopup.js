let popupWindow = null;

function abrirPopup() {
    if (popupWindow && !popupWindow.closed) {
        alert("El pop-up ya está abierto.");
        return;
    }

    popupWindow = window.open('popup.html', 'popup', 'width=400,height=300,top=50,left=' + (window.innerWidth - 400) / 2);

    document.getElementById('cerrar-popup').style.display = 'inline-block';
}

document.getElementById('abrir-popup').addEventListener('click', () => {
    abrirPopup()
});

document.getElementById('cerrar-popup').addEventListener('click', () => {
    if (popupWindow && !popupWindow.closed) {
        popupWindow.close();
        document.getElementById('cerrar-popup').style.display = 'none';
    }
});

setTimeout(abrirPopup, 5000);

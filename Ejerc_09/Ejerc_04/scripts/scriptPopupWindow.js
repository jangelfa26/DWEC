document.getElementById('cerrar-popup').addEventListener('click', () => {
    window.close();
    if (window.opener) {
        window.opener.document.querySelector('h1').textContent = 'El pop-up te saluda';
    }
});

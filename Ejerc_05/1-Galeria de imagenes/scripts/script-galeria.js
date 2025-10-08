function cambiarImagenPrincipal(numero) {
    let imagenesMiniatura = document.querySelector(".miniatura").children;
    let imgSelecionada = imagenesMiniatura[numero];
    let srcImgSelecionada = imgSelecionada.getAttribute('src');
    let imgPrincipal = document.querySelector("#imagen-principal img")
    let srcImgPrincipal = imgPrincipal.getAttribute("src");

    imgPrincipal.setAttribute("src", srcImgSelecionada);
    imgSelecionada.setAttribute("src", srcImgPrincipal);

    resaltarMiniatura(numero); // resaltaria la ultima miniatura que se cambio

}

function resaltarMiniatura(indice) {
        let imagenesMiniatura = document.querySelector(".miniatura").children;
        
        const limpiarImagenes = Array.from(imagenesMiniatura);
        
        limpiarImagenes.forEach(imagen => {
          imagen.removeAttribute("clase");  
        });
        let imgSelecionada = imagenesMiniatura[indice];
        console.log(imgSelecionada);
        imgSelecionada.setAttribute("clase","activa");
}

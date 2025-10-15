let arrastrable = document.getElementById("arrastrable");
let contenedor = document.getElementById("contenedor");

let arrastrando = false;
let difX = 0;
let difY = 0;

arrastrable.addEventListener("mousedown", (event) => {
    arrastrando = true;
    difX = event.clientX - arrastrable.offsetLeft;
    difY = event.clientY - arrastrable.offsetTop;
});

document.addEventListener("mousemove", (event) => {
    if (arrastrando) {
        let nuevaX = event.clientX - difX;
        let nuevaY = event.clientY - difY;

        if (nuevaX < 0){ 
            nuevaX = 0;
        }

        if (nuevaY < 0){
            nuevaY = 0;
        } 
        if (nuevaX > contenedor.clientWidth - arrastrable.offsetWidth){ 
            nuevaX = contenedor.clientWidth - arrastrable.offsetWidth;
        }

        if (nuevaY > contenedor.clientHeight - arrastrable.offsetHeight) {
             nuevaY = contenedor.clientHeight - arrastrable.offsetHeight;
        }

        arrastrable.style.left = nuevaX + "px";
        arrastrable.style.top = nuevaY + "px";
    }
});

document.addEventListener("mouseup", () => {
    arrastrando = false;
});

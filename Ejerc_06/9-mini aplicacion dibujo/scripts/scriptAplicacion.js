let cuadricula = document.getElementById("cuadricula");
let isDrawing = false;

for (let i = 0; i < 1600; i++) {
    let div = document.createElement("div");
    cuadricula.appendChild(div);

    div.addEventListener("mouseover", () => {
            if (isDrawing == true) {
                div.style.backgroundColor = "black";
            }
        });

    div.addEventListener("mousedown", () => {
            isDrawing = true;
            div.style.backgroundColor = "black";
        });
}

document.addEventListener("mouseup", () => {
        isDrawing = false;
    });

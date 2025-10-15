let tabla = document.getElementById("tabla");

tabla.addEventListener("dblclick", (evento) => {
        let celda = evento.target;

        if (celda.tagName == "TD") {
            let valorActual = celda.textContent;
            let input = document.createElement("input");
            input.type = "text";
            input.value = valorActual;
            celda.textContent = "";
            celda.appendChild(input);

            input.addEventListener("blur", () => {
                celda.textContent = input.value;
            });

            input.addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    input.blur();
                }
            });
        }
    });

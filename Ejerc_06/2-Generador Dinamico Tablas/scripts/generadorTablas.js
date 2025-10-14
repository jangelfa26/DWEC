let botonAñadirFila = document.getElementById("añadir");

botonAñadirFila.addEventListener("click" , () => {
    let inputNombre = document.getElementById("nombreInput").value;
    let inputApellido = document.getElementById("apellidoInput").value;

    if (inputNombre.length > 1 || inputApellido.length > 1) {
        let tabla = document.querySelector("body table");

        let tBody = tabla.querySelector("table tbody");

        if(tBody == null || tBody == undefined){
            tBody = document.createElement("tbody");
            tabla.appendChild(tBody);
        }

        let nuevaFila = document.createElement("tr");
        

        for (let i = 0; i < 2; i++) {
            let nuevoDato = document.createElement("td");
            if(i == 0) {
                nuevoDato.textContent = inputNombre;
            } else {
                nuevoDato.textContent = inputApellido;
            }
            nuevaFila.appendChild(nuevoDato);
            
        }
        tBody.appendChild(nuevaFila);
    }




})


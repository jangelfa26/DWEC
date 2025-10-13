let boton = document.querySelector("#botonAñadir");

boton.addEventListener("click", () => {
    let input = document.querySelector("#tareaInput").value;
    let listaUl = document.getElementsByTagName("ul")[0];

    if(input.length > 0){
        let tarea = document.createElement("li");
        tarea.textContent = input + " ";
        let botonEliminar = document.createElement("buton");
        botonEliminar.setAttribute("type","button")
        botonEliminar.setAttribute("id", "boton-Eliminar"); 
        botonEliminar.textContent = "Eliminar";
       
        botonEliminar.addEventListener("click", () => {
            let liAEliminar = botonEliminar.parentNode;
            liAEliminar.remove();

        })

         tarea.appendChild(botonEliminar);
        listaUl.appendChild(tarea);
    }
})


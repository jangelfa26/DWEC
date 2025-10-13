const usuarios = [{nombre: 'Ana', edad: 25}, {nombre: 'Luis', edad: 30}];

function crearTablaUsuarios(usuarios) {

       if (!usuarios || usuarios.length === 0) return "error: usuarios esta vacio";

    let fragmento = document.createDocumentFragment();

    let clavesObjeto = Object.keys(usuarios[0]);
    let tamanioObjeto = clavesObjeto.length;
    let tabla = document.createElement("table");

    tabla.border = 1;

    let trTitulo = document.createElement("tr");
    let tdTitulo = document.createElement("td");
    tdTitulo.textContent = "Usuarios";
    tdTitulo.style.textAlign = "center";
    tdTitulo.colSpan = tamanioObjeto;
    trTitulo.appendChild(tdTitulo);
    tabla.appendChild(trTitulo);

    let encabezado = document.createElement("tr");
    let incremento = 0;
    for(let i = 0; i < tamanioObjeto; i++){
        
        
        let td = document.createElement("td");
        
        td.textContent = clavesObjeto[incremento];
        td.style.textAlign = "center";
        encabezado.appendChild(td);
        incremento++;
    }    
    tabla.appendChild(encabezado);

    usuarios.forEach(usuario => {
        let tr = document.createElement("tr");
        Object.values(usuario).forEach (dato => {
            let td = document.createElement("td");
            td.textContent = dato;
            td.style.textAlign = "center";
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    });

    fragmento.appendChild(tabla);
    const contenedor = document.getElementById("contenedor-tabla");
    contenedor.replaceChildren(fragmento);
}

crearTablaUsuarios(usuarios);
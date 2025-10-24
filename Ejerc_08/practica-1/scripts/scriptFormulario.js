//boton
let botonRealizarPedido = document.getElementById("pedido-btn");
//tamaño de la pizza
let tamañoPequeña = document.getElementById("tamañoPequeña");
let tamañoMediana = document.getElementById("tamañoMediana");
let tamañoGrande = document.getElementById("tamañoGrande");

//Ingredientes Extra
let checkExtraQueso = document.getElementById("extraQueso");
let checkPepperoni = document.getElementById("pepperoni");
let checkChampiñones = document.getElementById("champiñones");
let checkPiña = document.getElementById("piña");

// tipo de masa
let selectTipoMasa = document.getElementById("tipoMasa");

//actualizar el precio
function actualizarPrecio() {
    let total = 0.00;

    let tamañoPizza = document.querySelector("input[name = tamaño]:checked");
    if (tamañoPizza != null || tamañoPizza != undefined) {
        let precioTamañoPizza = tamañoPizza.value;

        if (precioTamañoPizza != 0 || precioTamañoPizza != null || precioTamañoPizza != undefined) {
            let precio = parseFloat(precioTamañoPizza);

            total = total + precio;
        }

    }
    let tipoMasa = document.getElementById("tipoMasa");

    if (tipoMasa != null || tipoMasa != undefined) {
        let precioTipoMasa = tipoMasa.value;

        if (precioTipoMasa != null || precioTipoMasa != undefined) {
            let precio = parseFloat(precioTipoMasa);
            total = total + precio;
        }
    }
    let ingredientesExtra = document.querySelectorAll("input[name = ingredienteExtra]:checked");
    if (ingredientesExtra != null || ingredientesExtra != undefined) {
        let ArrayIngredientesExtra = Array.from(ingredientesExtra);

        ArrayIngredientesExtra.forEach(ingrediente => {
            let precioIngrediente = ingrediente.value;
            
            if (precioIngrediente != null || precioIngrediente != undefined) {
                let precio = parseFloat(precioIngrediente);
                total = total + precio;
            }
        })
    }
    let areaPrecioPedido = document.getElementById("precioPedido");
    let h2 = areaPrecioPedido.querySelector("h2");
    areaPrecioPedido.removeChild(h2);
    let nuevoPrecio = document.createElement("h2");
    nuevoPrecio.textContent = "Precio Total: " + total + " €";
    areaPrecioPedido.appendChild(nuevoPrecio);

}

//listener elementos
tamañoPequeña.addEventListener("change", () => {
    actualizarPrecio();
})

tamañoMediana.addEventListener("change", () => {
    actualizarPrecio();
})

tamañoGrande.addEventListener("change", () => {
    actualizarPrecio();
})

checkExtraQueso.addEventListener("change", () => {
    actualizarPrecio();
})

checkPepperoni.addEventListener("change", () => {
    actualizarPrecio();
})

checkChampiñones.addEventListener("change", () => {
    actualizarPrecio();
})

checkPiña.addEventListener("change", () => {
    actualizarPrecio();
})

selectTipoMasa.addEventListener("change", () => {
    actualizarPrecio();
})

// funcion para hacer el resumen del pedido

function resumenPedido() {
    let resumen = "Resumen del pedido:  ";

    let tamañoPizza = document.querySelector("input[name = tamaño]:checked").previousElementSibling;
    if (tamañoPizza != null || tamañoPizza != undefined) {
        resumen += "- tamaño de la pizza: ";
        resumen += tamañoPizza.textContent + ", ";

    }

    let tipoMasa = document.getElementById("tipoMasa");
    if (tipoMasa != null || tipoMasa != undefined) {
        let masaSeleccionada = tipoMasa.options[tipoMasa.selectedIndex];
        resumen += "- tipo de masa: ";
        resumen += masaSeleccionada.textContent + ", ";

    }
    let ingredientesExtra = document.querySelectorAll("input[name = ingredienteExtra]:checked");
    if (ingredientesExtra != null || ingredientesExtra != undefined) {
        let ArrayIngredientesExtra = Array.from(ingredientesExtra); 
        resumen += "- ingredientes extra: ";
        ArrayIngredientesExtra.forEach(ingrediente => {
           
            resumen += ingrediente.id + ", ";
        })
    } else {
        resumen += "Sin ingredientes extra <br>"
    }
    let precioPedido = document.querySelector("#precioPedido h2");
    if ( precioPedido != null || precioPedido != undefined) {
        resumen += precioPedido.textContent;
    }
    return resumen;
}

//listener del boton de realizar pedido, que muestre un alert con el resultado del pedido
botonRealizarPedido.addEventListener("click", () => {
    alert(resumenPedido());
})
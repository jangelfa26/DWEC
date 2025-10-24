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
        console.log(ArrayIngredientesExtra);

        ArrayIngredientesExtra.forEach(ingrediente => {
            let precioIngrediente = ingrediente.value;
            console.log(precioIngrediente);
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
    
}

//listener del boton de realizar pedido, que muestre un alert con el resultado del pedido
botonRealizarPedido.addEventListener("click", () => {
    
})
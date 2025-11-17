async function buscarUsuarioYPedidos(emailIntroducido) {
    const respuestaUsuarios = await fetch("../data/usuarios.json");
    const listaUsuarios = await respuestaUsuarios.json();

    const usuarioEncontrado = listaUsuarios.find(function(usuario) {
        return usuario.email === emailIntroducido;
    });

    if (!usuarioEncontrado) {
        throw new Error("Usuario no encontrado");
    }

    const respuestaPedidos = await fetch("../data/pedidos.json");
    const listaPedidos = await respuestaPedidos.json();

    const pedidosUsuario = listaPedidos.filter(function(pedido) {
        return pedido.usuarioId === usuarioEncontrado.id;
    });

    return {
        usuario: usuarioEncontrado,
        pedidos: pedidosUsuario
    };
}

function mostrarResultados(datos) {
    const contenedor = document.getElementById("contenedor-resultados");
    contenedor.innerHTML = "";

    const usuario = datos.usuario;
    const pedidos = datos.pedidos;

    const bloqueUsuario = document.createElement("div");
    bloqueUsuario.innerHTML = `
        <h2>Usuario encontrado:</h2>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Fecha de registro:</strong> ${usuario.fechaRegistro}</p>
    `;
    contenedor.appendChild(bloqueUsuario);

    const tituloPedidos = document.createElement("h3");
    tituloPedidos.textContent = "Pedidos del usuario:";
    contenedor.appendChild(tituloPedidos);

    if (pedidos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Este usuario no tiene pedidos registrados.";
        contenedor.appendChild(mensaje);
        return;
    }

    pedidos.forEach(function(pedido) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-pedido";

        tarjeta.innerHTML = `
            <p><strong>ID Pedido:</strong> ${pedido.id}</p>
            <p><strong>Fecha:</strong> ${pedido.fecha}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}


document.getElementById("formulario-busqueda").addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const campoEmail = document.getElementById("campo-email");
    const emailIntroducido = campoEmail.value.trim();

    const mensajeEstado = document.getElementById("mensaje-estado");
    const contenedorResultados = document.getElementById("contenedor-resultados");

    mensajeEstado.textContent = "";
    contenedorResultados.innerHTML = "";

    if (emailIntroducido == "" || !emailIntroducido.includes("@")) {
        mensajeEstado.textContent = "Introduce un email válido.";
        return;
    }

    try {
        mensajeEstado.textContent = "Buscando...";
        const datos = await buscarUsuarioYPedidos(emailIntroducido);

        mensajeEstado.textContent = ""; 
        mostrarResultados(datos);

    } catch (error) {
        mensajeEstado.textContent = error.message;
    }
});

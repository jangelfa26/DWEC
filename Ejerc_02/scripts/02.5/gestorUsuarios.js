export function crearPerfil(nombre, email, edad) {
    const usuario = {
        nombre: nombre, 
        email: email, 
        edad: edad
    } 
    return usuario
}


export default function mostrarPerfil(usuario){
    console.log( "Nombre: ["+ usuario.nombre+ "] Email: ["+ usuario.email +"]  Edad: ["+ usuario.edad+ "]")
}


export function esMayorDeEdad(usuario){
    return usuario.edad > 18
}

export function obtenerMayoresDeEdad(usuarios){
   const usuariosMayoresDeEdad = usuarios.filter(usuario => esMayorDeEdad(usuario))
    return usuariosMayoresDeEdad
}

export function calcularPromedioEdad(usuarios){
    let longitudArray = usuarios.length
    let edadUsuarios = 0
    usuarios.forEach(usuario => {
        edadUsuarios = edadUsuarios + usuario.edad 
    })
    let promedioEdad = edadUsuarios/longitudArray
    return promedioEdad
}
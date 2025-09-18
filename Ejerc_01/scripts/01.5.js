const estudiantes = [
    {nombre: "Laura", apellidos: "Fernández Correa", calificacion: 7, aprobado: true},
    {nombre: "Carlos", apellidos: "Guerra Álvarez", calificacion: 3, aprobado: false},
    {nombre: "Miguel", apellidos: "Torres Gil", calificacion: 10, aprobado: true},
    {nombre: "Ana", apellidos: "Martinez Oveja", calificacion: 5, aprobado: true},
    {nombre: "Ariadna", apellidos: "Paredes Cardo", calificacion: 2, aprobado: true}
]

const estudiantesIdentificados = estudiantes.map((estudiante, indice) => ({...estudiante, id: ++indice}))
console.table(estudiantesIdentificados)

const estudiantesAprobados = estudiantes.filter(estudiante => estudiante.calificacion >= 5)
console.table(estudiantesAprobados)

estudiantesAprobados.forEach(estudiante => {
    console.log("Felicidades " + estudiante.nombre + ", has aprobado con " + estudiante.calificacion)
});

estudiantes.forEach(estudiante => {
    const {nombre, apellidos, calificacion, aprobado} = estudiante
    let mensaje = "Incoherencia en el registro de "+ nombre +" "+apellidos +": calificación = ["+ calificacion + "], aprobado = ["+aprobado+"]"
    if (calificacion >= 5 && aprobado == false) {
        console.log(mensaje)
    }

    if (calificacion < 5 && aprobado == true) {
       console.log(mensaje)
    }
})

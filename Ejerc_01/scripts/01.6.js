const cursos =[
    {nombre: "1º DAW",
     profesor: "Paco Ruiz",
     estudiantes:[
        {nombre: "Laura Fernández", calificacion: 7},
        {nombre: "Carlos Guerra", calificacion: 5},
        {nombre: "Miguel Torres", calificacion: 10}
     ]
    },

    {nombre: "2º DAW",
     profesor: "Manuel Carcaño",
     estudiantes:[
        {nombre: "Ana Martinez", calificacion: 5},
        {nombre: "Ariadna Paredes", calificacion: 2},
        {nombre: "Daniel Gil", calificacion: 8}
     ],
    },

    {nombre: "1º ASIR",
     profesor: "Javier Clemente",
     estudiantes:[
        {nombre: "Pablo Fernández", calificacion: 4},
        {nombre: "Macarena Gonzalez", calificacion: 6},
        {nombre: "Roberto Gimenez", calificacion: 9}
     ],
    },

    {nombre: "2º ASIR",
     profesor: "Julia Carrasco",
     estudiantes:[
        {nombre: "Luis Paredes", calificacion: 5},
        {nombre: "Carmen León", calificacion: 8},
        {nombre: "Lucia Álvarez", calificacion: 3}
     ],
    }
]
console.table(cursos)


function promedioCalificacionesCurso(estudiantes) {
    let sumaCalificaciones = 0
    let cantidadEstudiantes= 0
    estudiantes.forEach(estudiante => {
        sumaCalificaciones = sumaCalificaciones + estudiante.calificacion    
        cantidadEstudiantes++
    });
    let resultado = sumaCalificaciones/cantidadEstudiantes
    return resultado
}
const resumenCursos = cursos.map(curso => ({nombre: curso.nombre, promedioCalificaciones: promedioCalificacionesCurso(curso.estudiantes) }))
console.table(resumenCursos)


const cursosDestacados = resumenCursos.filter(rCurso => rCurso.promedioCalificaciones >=7)
console.table(cursosDestacados)

cursosDestacados.forEach(curso => {
    const {nombreCurso, promedioCalificaciones} = curso
    console.log("El curso [" + nombreCurso +"] tiene un promedio de ["+ promedioCalificaciones+"] y es considerado destacado.")

})

function buscarEstudiantesSuspensos(estudiantes){
    let haySuspensos = false
    estudiantes.forEach(estudiante =>{
        if (estudiante.calificacion < 4) {
            haySuspensos = true
        }
        
    })
    return haySuspensos
}

cursos.forEach(curso => {
    const {nombre, estudiantes} = curso

    if (buscarEstudiantesSuspensos(estudiantes)) {
        console.log("Atención: En el curso ["+nombre+ "] hay estudiantes con calificaciones muy bajas.")
    }


})

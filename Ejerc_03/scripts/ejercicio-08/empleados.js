/*
En `empleados.js`, crea un módulo para gestionar una lista de empleados. El arreglo de objetos de empleados debe tener: `id`, `nombre`, `departamento` y `salario`.

El módulo debe exportar las siguientes funciones:
* `agregarEmpleado(empleado)`
* `eliminarEmpleado(id)`
* `buscarPorDepartamento(departamento)`: Debe devolver un arreglo con los empleados de ese departamento (`.filter()`).
* `calcularSalarioPromedio()`: Debe devolver el salario promedio de todos los empleados (`.reduce()`).
* `obtenerEmpleadosOrdenadosPorSalario()`: Debe devolver un nuevo arreglo con los empleados ordenados de mayor a menor salario (`.sort()`).
*/

export let empleados = [
  { id: 1, nombre: "Ana López", departamento: "Recursos Humanos", salario: 32000 },
  { id: 2, nombre: "Carlos Ramírez", departamento: "Finanzas", salario: 45000 },
  { id: 3, nombre: "María Fernández", departamento: "Marketing", salario: 38000 },
  { id: 4, nombre: "José Martínez", departamento: "IT", salario: 50000 },
  { id: 5, nombre: "Laura Sánchez", departamento: "Ventas", salario: 41000 },
  { id: 6, nombre: "Pedro Gómez", departamento: "Producción", salario: 36000 },
  { id: 7, nombre: "Lucía Torres", departamento: "Logística", salario: 34000 },
  { id: 8, nombre: "Javier Morales", departamento: "Compras", salario: 37000 },
  { id: 9, nombre: "Sofía Castillo", departamento: "Atención al Cliente", salario: 33000 },
  { id: 10, nombre: "Diego Herrera", departamento: "Legal", salario: 46000 }
];



export function agregarEmpleado(empleado) {
    let numeroEmpleados = empleados.length+1;
    empleado.id = numeroEmpleados;
    empleados.push(empleado);
}

export function eliminarEmpleado(id) {
  let posicionBorrar = empleados.findIndex(empleado => empleado.id == id);

  empleados.splice(posicionBorrar, 1);

}

export function buscarPorDepartamento(departamento) {
  let listaDepartamento = empleados.filter(empleado => empleado.departamento == departamento);  
  return listaDepartamento;
}

export function calcularSalarioPromedio() {
  let listaSalarios= [];
  listaSalarios = empleados.map(empleado => empleado.salario);
  let totalSalarios = listaSalarios.reduce((total, salario) => total + salario, 0)
  let totalEmpleados = empleados.length;
  
  return (totalSalarios/totalEmpleados);
}

export function obtenerEmpleadosOrdenadosPorSalario() {
  let empleadosOrdenados = empleados.sort((a,b) => a.salario-b.salario);
  
}

export function hayLibrosLargos(limitePaginas) {
  let hayLibrosExtensos = libros.some(libro => libro.paginas > limitePaginas);
  return hayLibrosExtensos;
}

export function todosSonLibrosCortos(limitePaginas) {
  let todosLibrosCortos = libros.every(libro => libro.paginas <= limitePaginas);
  return todosLibrosCortos;
}


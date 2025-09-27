import { empleados, agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario } from "./empleados.js";

let nuevoEmpleado1 = { nombre: "Pedro Gómez", departamento: "Producción", salario: 36000 };
let nuevoEmpleado2 = { nombre: "Lucía Torres", departamento: "Logística", salario: 34000 };
let nuevoEmpleado3 = { nombre: "Javier Morales", departamento: "Compras", salario: 37000 };

agregarEmpleado(nuevoEmpleado1);
agregarEmpleado(nuevoEmpleado2);
agregarEmpleado(nuevoEmpleado3);

console.log(empleados);

let empleadosIT = buscarPorDepartamento("IT");
console.log(empleadosIT);

let mediaSalario = calcularSalarioPromedio();
console.log(mediaSalario);

let empleadosOrdenados = obtenerEmpleadosOrdenadosPorSalario();
console.log(empleadosOrdenados);

eliminarEmpleado(2);
console.log(empleados);

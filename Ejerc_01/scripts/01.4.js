const ciudades =["Madrid", "Buenos Aires", "Tokio", "Nueva York", "Paris"]
console.log(ciudades)

ciudades.push("Roma")
console.log(ciudades)

const ciudadesMayusculas = ciudades.map(ciudad => ciudad.toUpperCase())
console.log(ciudadesMayusculas)

const ciudadesFiltradas = ciudades.filter(ciudad => ciudad.length > 6)
console.log(ciudadesFiltradas)

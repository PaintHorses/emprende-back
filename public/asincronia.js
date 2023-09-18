// Asincronia dada por el entorno => TIMER
let seconds =2

setTimeout( () => {
    console.log(`Ya pasaron los ${seconds}`)
}, seconds * 1000)

console.log("Esto se ejecutará al instante")

console.time("Loop took")
let total = 0
for (let index = 0; index < 500000000; index++) {
    total += index
}

console.timeEnd("Loop took")
console.log("Finalizo el loop", total)
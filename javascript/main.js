// simulador de prestamos
// idea basada en lo visto en clase

const datos = {
    usuario: "fran",
    contrasenia: "1234",
    ingreso: false,
    prestamos: []
}

function login(intentos, maxIntentos){
    alert("Intento " + (intentos + 1) + " de " + maxIntentos)
    let usuarioIngresado = prompt("Ingrese usuario").toLowerCase()
    let contraseniaIngresada = prompt("Ingrese contraseña")

    if(usuarioIngresado === datos.usuario && contraseniaIngresada === datos.contrasenia){
        alert("Bienvenido al sistema")
        datos.ingreso = true
        return true
    } else {
        alert("Datos incorrectos")
    }
}

function simularPrestamo(){
    let monto = Number(prompt("Ingrese el monto del prestamo"))
    while(isNaN(monto) || monto <= 0){
        monto = Number(prompt("Monto invalido, ingrese nuevamente"))
    }

    let cuotas = Number(prompt("Ingrese la cantidad de cuotas (6, 12 o 24)"))
    while(cuotas !== 6 && cuotas !== 12 && cuotas !== 24){
        cuotas = Number(prompt("Cuotas invalidas, ingrese 6, 12 o 24"))
    }

    let interes
    if(cuotas === 6){
        interes = 1.2
    } else if(cuotas === 12){
        interes = 1.4
    } else {
        interes = 1.6
    }

    let total = monto * interes

    const prestamo = {
        monto: monto,
        cuotas: cuotas,
        total: total
    }

    datos.prestamos.push(prestamo)

    alert(
        "Prestamo creado\n" +
        "Monto: $" + monto + "\n" +
        "Cuotas: " + cuotas + "\n" +
        "Total: $" + total.toFixed(2)
    )
}

function mostrarPrestamos(){
    if(datos.prestamos.length === 0){
        alert("Todavia no hay prestamos")
        return
    }

    let texto = "Prestamos realizados:"
    for(let i = 0; i < datos.prestamos.length; i++){
        texto += "\n" + (i+1) + " - $" + datos.prestamos[i].monto + " en " + datos.prestamos[i].cuotas + " cuotas"
    }
    alert(texto)
}

function menu(){
    let opcion = prompt(
        "Que desea hacer:\n" +
        "1 - Simular prestamo\n" +
        "2 - Ver prestamos\n" +
        "3 - Salir"
    )
    return Number(opcion)
}

function selector(opcion){
    switch(opcion){
        case 1:
            simularPrestamo()
            break
        case 2:
            mostrarPrestamos()
            break
        case 3:
            alert("Fin del programa")
            return false
        default:
            alert("Opcion invalida")
    }
    return true
}

function inicializar(){
    let intentos = 0
    const maxIntentos = 3

    do{
        login(intentos, maxIntentos)
        intentos++
    } while(!datos.ingreso && intentos < maxIntentos)

    if(datos.ingreso){
        let continuar = true
        while(continuar){
            continuar = selector(menu())
        }
    }
}

inicializar()
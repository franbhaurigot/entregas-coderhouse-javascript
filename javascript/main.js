// =============================
// CLASE ARTICULO
// =============================
class Articulo {
    constructor(nombre, codigo, categoria, precio, stock, detalle) {
        this.nombre = nombre
        this.codigo = codigo
        this.categoria = categoria
        this.precio = Number(precio)
        this.stock = stock
        this.detalle = detalle
    }
}



// =============================
// ESTADO GLOBAL
// =============================
let inventario = JSON.parse(localStorage.getItem("inventario")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let ventas = JSON.parse(localStorage.getItem("ventas")) || []

// =============================
// INICIALIZAR INVENTARIO
// =============================
const inicializarInventario = () => {
    if (inventario.length === 0) {
        catalogoInicial.forEach(item => {
            inventario.push(new Articulo(
                item.nombre,
                item.codigo,
                item.categoria,
                item.precio,
                item.stock,
                item.detalle
            ))
        })
        localStorage.setItem("inventario", JSON.stringify(inventario))
    }
}

// =============================
// RENDER PRODUCTOS
// =============================
const mostrarProductos = (lista) => {

    const contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""

    lista.forEach(producto => {

        const card = document.createElement("div")
        card.className = "card m-2 p-2"
        card.style.width = "260px"

        card.innerHTML = `
            <h5>${producto.nombre}</h5>
            <h6>${producto.categoria}</h6>
            <p>${producto.detalle}</p>
            <p><strong>$${producto.precio}</strong></p>
            <p>Stock: ${producto.stock}</p>
            <input type="number" min="1" max="${producto.stock}" placeholder="Cantidad" id="cant-${producto.codigo}">
            <button class="btn btn-primary mt-2" id="btn-${producto.codigo}">Agregar</button>
        `

        contenedor.appendChild(card)

        document.getElementById(`btn-${producto.codigo}`)
            .addEventListener("click", () => {

                const cantidad = Number(document.getElementById(`cant-${producto.codigo}`).value)

                if (cantidad > 0 && cantidad <= producto.stock) {
                    agregarAlCarrito(producto, cantidad)
                } else {
                    Swal.fire("Error", "Cantidad inválida", "error")
                }
            })
    })
}

// =============================
// AGREGAR AL CARRITO
// =============================
const agregarAlCarrito = (producto, cantidad) => {

    const existente = carrito.find(p => p.codigo === producto.codigo)

    if (existente) {
        existente.cantidad += cantidad
    } else {
        carrito.push({ ...producto, cantidad })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()

    Swal.fire("Agregado", "Producto agregado al carrito", "success")
}

// =============================
// RENDER CARRITO
// =============================
const renderCarrito = () => {

    const lista = document.getElementById("listaCarrito")
    lista.innerHTML = ""

    carrito.forEach(item => {

        const li = document.createElement("li")
        li.className = "list-group-item"

        li.innerHTML = `
            ${item.nombre} - ${item.cantidad} x $${item.precio}
            <button class="btn btn-danger btn-sm float-end" id="del-${item.codigo}">X</button>
        `

        lista.appendChild(li)

        document.getElementById(`del-${item.codigo}`).onclick = () => {
            carrito = carrito.filter(p => p.codigo !== item.codigo)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            renderCarrito()
        }
    })

    actualizarTotal()
    actualizarContador()
}

// =============================
// TOTAL + DESCUENTO
// =============================
const actualizarTotal = () => {

    let subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    let descuento = 0
    if (subtotal > 8000) {
        descuento = subtotal * 0.10
    }

    let totalFinal = subtotal - descuento

    document.getElementById("carritoTotal").innerHTML =
        `Subtotal: $${subtotal} | Descuento: $${descuento} | Total: $${totalFinal}`
}

// =============================
// CONTADOR DINÁMICO
// =============================
const actualizarContador = () => {

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

    let contador = document.getElementById("contadorCarrito")

    if (!contador) {
        contador = document.createElement("p")
        contador.id = "contadorCarrito"
        document.getElementById("carritoTotal").before(contador)
    }

    contador.innerHTML = `Productos en carrito: ${totalItems}`
}

// =============================
// VACIAR CARRITO
// =============================
const vaciarCarrito = () => {

    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()

    Swal.fire("Carrito vacío", "Se eliminaron todos los productos", "info")
}

// =============================
// FINALIZAR COMPRA
// =============================
const procesarCompra = (evento) => {

    evento.preventDefault()

    if (carrito.length === 0) {
        Swal.fire("Error", "El carrito está vacío", "warning")
        return
    }

    const datos = new FormData(evento.target)
    const cliente = Object.fromEntries(datos)

    const orden = {
        id: ventas.length + 1,
        fecha: new Date().toLocaleString(),
        cliente,
        productos: carrito,
        total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    }

    ventas.push(orden)
    localStorage.setItem("ventas", JSON.stringify(ventas))

    mostrarTicket(orden)

    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
}

// =============================
// TICKET VISUAL
// =============================
const mostrarTicket = (orden) => {

    let detalleProductos = orden.productos.map(p =>
        `${p.nombre} - ${p.cantidad} x $${p.precio}`
    ).join("<br>")

    Swal.fire({
        title: "Compra realizada 🎉",
        html: `
            <strong>Cliente:</strong> ${orden.cliente.nombre || "No especificado"}<br>
            <strong>Fecha:</strong> ${orden.fecha}<br><br>
            ${detalleProductos}<br><br>
            <strong>Total: $${orden.total}</strong>
        `,
        icon: "success"
    })
}


document.getElementById("tipoProducto")
    .addEventListener("change", (e) => {

        const valor = e.target.value

        if (valor === "0") {
            mostrarProductos(inventario)
        } else {
            mostrarProductos(inventario.filter(p => p.categoria === valor))
        }
    })


const botonVaciar = document.createElement("button")
botonVaciar.innerText = "Vaciar carrito"
botonVaciar.className = "btn btn-secondary mt-2"
botonVaciar.onclick = vaciarCarrito
document.getElementById("listaCarrito").after(botonVaciar)


document.getElementById("contenedorProductos").innerHTML = "Cargando productos..."





const cargarProductos = async () => {

    try {
        const response = await fetch("./javascript/productos.json")
        const data = await response.json()

        inventario = data.map(prod => new Articulo(
            prod.nombre,
            prod.codigo,
            prod.categoria,
            prod.precio,
            prod.stock,
            prod.detalle
        ))

        localStorage.setItem("inventario", JSON.stringify(inventario))

        mostrarProductos(inventario)

    } catch (error) {
        console.warn("Error al cargar productos", error)
    }
}



const iniciarApp = () => {
    cargarProductos()
    renderCarrito()
}


document.getElementById("formCompraFinal")
    .addEventListener("submit", procesarCompra)

iniciarApp()
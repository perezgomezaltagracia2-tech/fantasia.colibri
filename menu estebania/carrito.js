
"use strict";

// LISTA DE PRODUCTOS
const productos = [
    {id:1, nombre:"Pantis en algodón", precio:150, imagen:"PRODUCTO1.JPG"},
    {id:2, nombre:"Pantis en algodón de colores", precio:50, imagen:"PRODUCTO2.JPG"},
    {id:3, nombre:"Combo para damas y caballeros", precio:400, imagen:"PRODUCTO3.JPEG"},
    {id:4, nombre:"Conjunto en algodón para dormir", precio:300, imagen:"PRODUCTO4.JPG"},
    {id:5, nombre:"Pantis en algodón para niñas", precio:150, imagen:"PRODUCTO5.JPG"},
    {id:6, nombre:"Pantis en algodón para niñas", precio:200, imagen:"PRODUCTO6.JPG"},
    {id:7, nombre:"Boxer para caballeros", precio:100, imagen:"PRODUCTO7.PNG"},
    {id:8, nombre:"Boxer tipo calcetines para caballeros", precio:100, imagen:"PRODUCTO8.JPG"},
    {id:9, nombre:"Brasieres para damas", precio:200, imagen:"PRODUCTO9.JPG"},
    {id:10, nombre:"Conjunto pantis y brasieres", precio:250, imagen:"PRODUCTO10.JPG"},
    {id:11, nombre:"Pantis", precio:100, imagen:"PRODUCTO11.PNG"},
    {id:12, nombre:"Pantis, paquete de 3 unidades", precio:175, imagen:"PRODUCTO12.JPG"},
    {id:13, nombre:"Boxer de colores", precio:180, imagen:"PRODUCTO13.JPG"},
    {id:14, nombre:"Conjuntos pantis y brasieres", precio:180, imagen:"PRODUCTO14.JPG"},
    {id:15, nombre:"Especial de ropa interior para damas", precio:45, imagen:"PRODUCTO15.JPG"},
    {id:16, nombre:"Especial de ropa interior para damas", precio:45, imagen:"PRODUCTO16.JPG"},
    {id:17, nombre:"Pantis para niñas desde 3 meses", precio:45, imagen:"PRODUCTO17.JPG"},
    {id:18, nombre:"Especial pantis, boxer y conjunto", precio:45, imagen:"PRODUCTO18.JPG"},
    {id:19, nombre:"Especial pantis", precio:45, imagen:"PRODUCTO19.JPG"},
    {id:20, nombre:"Pantis y boxer", precio:65, imagen:"PRODUCTO20.WEBP"}
];

// VARIABLE DEL CARRITO
let carrito = [];

const catalogo = document.getElementById("catalogo");
const lista = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");
const resumen = document.getElementById("resumen");
const detalleResumen = document.getElementById("detalle-resumen");
const totalResumen = document.getElementById("total-resumen");

// FORMATO DE PRECIOS
function dinero(valor) {
    return "RD$ " + valor.toLocaleString("es-DO");
}

// MOSTRAR CATÁLOGO
function mostrarCatalogo() {
    productos.forEach(function(producto) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = dinero(producto.precio);

        const boton = document.createElement("button");
        boton.textContent = "AÑADIR A CARRITO";
        boton.type = "button";

        boton.addEventListener("click", function() {
            agregar(producto.id);
        });

        tarjeta.append(imagen, nombre, precio, boton);
        catalogo.appendChild(tarjeta);
    });
}

// AGREGAR PRODUCTOS
function agregar(id) {
    const producto = productos.find(p => p.id === id);
    const encontrado = carrito.find(p => p.id === id);

    if (encontrado) {
        encontrado.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 
        });
    }

    resumen.hidden = true;
    mensaje.textContent = "Producto agregado al carrito.";
    actualizarCarrito();
}

// SUMAR TODOS LOS PEDIDOS
function calcularTotal() {
    return carrito.reduce(function(suma, producto) {
        return suma + producto.precio * producto.cantidad;
    }, 0);
}

// ACTUALIZAR CARRITO Y SUBTOTALES
function actualizarCarrito() {
    lista.innerHTML = "";

    if (carrito.length === 0) {
        const fila = lista.insertRow();
        const celda = fila.insertCell();
        celda.colSpan = 5;
        celda.textContent = "Tu carrito está vacío.";
    }

    carrito.forEach(function(producto) {
        const fila = lista.insertRow();

        fila.insertCell().textContent = producto.nombre;
        fila.insertCell().textContent = dinero(producto.precio);

        const celdaCantidad = fila.insertCell();
        const cantidad = document.createElement("input");

        cantidad.type = "number";
        cantidad.min = "1";
        cantidad.max = "99";
        cantidad.value = producto.cantidad;
        cantidad.setAttribute("aria-label", "Cantidad de " + producto.nombre);

        cantidad.addEventListener("change", function() {
            const valor = Number(cantidad.value);

            if (!Number.isInteger(valor) || valor < 1 || valor > 99) {
                mensaje.textContent = "Introduce una cantidad entre 1 y 99.";
                cantidad.value = producto.cantidad;
                return;
            }

            producto.cantidad = valor;
            resumen.hidden = true;
            actualizarCarrito();
        });

        celdaCantidad.appendChild(cantidad);

        fila.insertCell().textContent =
            dinero(producto.precio * producto.cantidad);

        const accion = fila.insertCell();
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";

        botonEliminar.addEventListener("click", function() {
            carrito = carrito.filter(p => p.id !== producto.id);
            resumen.hidden = true;
            mensaje.textContent = "Producto eliminado.";
            actualizarCarrito();
        });

        accion.appendChild(botonEliminar);
    });

    total.textContent = dinero(calcularTotal());
}

// BOTÓN 1: PAGAR
document.getElementById("pagar").addEventListener("click", function() {
    if (carrito.length === 0) {
        resumen.hidden = true;
        mensaje.textContent = "Agrega productos antes de pagar.";
        return;
    }

    detalleResumen.innerHTML = "";

    carrito.forEach(function(producto) {
        const linea = document.createElement("p");
        linea.textContent =
            producto.nombre + " x " + producto.cantidad +
            " = " + dinero(producto.precio * producto.cantidad);

        detalleResumen.appendChild(linea);
    });

    totalResumen.textContent = dinero(calcularTotal());
    resumen.hidden = false;
    mensaje.textContent = "Revisa el resumen de tu compra.";
});

// BOTÓN 2: VACIAR CARRITO
document.getElementById("vaciar").addEventListener("click", function() {
    carrito = [];
    resumen.hidden = true;
    mensaje.textContent = "El carrito ha sido vaciado.";
    actualizarCarrito();
});

// BOTÓN 3: COMPLETAR PAGO
document.getElementById("completar").addEventListener("click", function() {
    if (carrito.length === 0) {
        mensaje.textContent = "No tienes productos para comprar.";
        return;
    }

    if (resumen.hidden) {
        mensaje.textContent = "Presiona PAGAR y revisa el resumen primero.";
        return;
    }

    const importe = calcularTotal();

    mensaje.textContent =
        "¡Compra finalizada! Total del pedido: " + dinero(importe) +
        ". Confirmación de demostración.";

    carrito = [];
    resumen.hidden = true;
    actualizarCarrito();
});

// INICIAR
mostrarCatalogo();
actualizarCarrito();
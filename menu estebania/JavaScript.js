
const carrito = [];

function obtenerPrecio(texto) {
    const coincidencia = texto.match(/\$(\d+(?:\.\d+)?)/);
    return coincidencia ? Number(coincidencia[1]) : 0;
}

function agregarAlCarrito(boton) {
    const producto = boton.closest(".producto");
    const nombre = producto.querySelector("h2").textContent.trim();
    const textoPrecio = producto.querySelector(".precio").textContent;
    const precio = obtenerPrecio(textoPrecio);

    if (precio <=  {
        alert("No se pudo identificar el precio.");
        return;
    }

    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");
    const avisoVacio = document.getElementById("carrito-vacio");

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, indice) => {
        total += producto.precio;

        const item = document.createElement("li");
        item.textContent =
            `${indice + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}`;

        lista.appendChild(item);
    });

    totalElemento.textContent = `$${total.toFixed(2)}`;
    avisoVacio.style.display = carrito.length ? "none" : "block";
}

function pagar() {
    if (carrito.length === 0) {
        alert("Agrega productos antes de pagar.");
        return;
    }

    alert("Revisa el total antes de completar el pago.");
}

function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarrito();

    document.getElementById("mensaje-pago").textContent =
        "El carrito está vacío.";
}

function completarPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio,
        0
    );

    if (confirm(`¿Confirmas la compra por $${total.toFixed(2)}?`)) {
        alert(`Compra completada. Total: $${total.toFixed(2)}`);

        carrito.length = 0;
        actualizarCarrito();

        document.getElementById("mensaje-pago").textContent =
            "Compra finalizada correctamente.";
    }
}
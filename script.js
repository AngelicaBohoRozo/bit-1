const carrito = document.getElementById('carrito');
const listaProductos = document.getElementById('lista-1');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Agrega producto
    listaProductos.addEventListener('click', agregarProducto);

    // Elimina producto
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

// Funciones

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.closest('.product');
        leerDatosProducto(producto);
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some(prod => prod.id === infoProducto.id);
    if (existe) {
        articulosCarrito = articulosCarrito.map(prod => {
            if (prod.id === infoProducto.id) {
                prod.cantidad++;
                return prod;
            } else {
                return prod;
            }
        });
    } else {
        articulosCarrito.push(infoProducto);
    }

    actualizarCarritoHTML();
}

function eliminarProducto(e) {
    if (e.target.textContent === 'X') {
        const productoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(prod => prod.id !== productoId);
        actualizarCarritoHTML();
    }
}

function actualizarCarritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach(prod => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${prod.imagen}" width="50"></td>
            <td>${prod.nombre}</td>
            <td>${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td><a href="#" class="borrar-producto" data-id="${prod.id}">X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
const carrito = document.querySelector(`#carrito`);
const contenedorCarrito = document.querySelector(`#lista-carrito tbody`);
const vaciarCarritoBtn = document.querySelector(`#vaciar-carrito`);
const listaCursos = document.querySelector(`#lista-cursos`);
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener(`click`, agregarCurso);

    carrito.addEventListener(`click`, eliminarCurso);

    vaciarCarritoBtn.addEventListener(`click`, () => {
        articulosCarrito = [];

        carritoHTML()
    })

}



//funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains(`agregar-carrito`)) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado)
    }

}
//eliminar un articulo del carrito

function eliminarCurso(e) {
    if (e.target.classList.contains(`borrar-curso`)) {
        const cursoId = e.target.getAttribute(`data-id`)
        //elimina el curso con un filter
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML()
    }
}


// lee el contenido de HTML al que le dimos cick y atrae la informacion del curso

function leerDatosCurso(curso) {

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector(`img`).src,
        titulo: curso.querySelector(`h4`).textContent,
        precio: curso.querySelector(`.precio span`).textContent,
        id: curso.querySelector(`a`).getAttribute(`data-id`),
        cantidad: 1
    }

    // revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => infoCurso.id === curso.id)
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (infoCurso.id === curso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }

        })
        articulosCarrito = [...cursos];
    } else {
        //agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }




    carritoHTML();
}
// muestra el carrito de compras en el HTML

function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach(curso => {

        const { imagen, titulo, precio, cantidad, id } = curso

        const row = document.createElement(`tr`);
        row.innerHTML = `
        <td><img src=${imagen} alt="" width="100"></td>
        <td>${titulo}</td>
        <td>USD ${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        // agrega el HTML del carrito en el tbody


        contenedorCarrito.appendChild(row)

    })

}

//limpiar html

function limpiarHTML() {
    contenedorCarrito.innerHTML = ``;

}
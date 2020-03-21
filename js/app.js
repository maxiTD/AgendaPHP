
const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    //Listener para eliminar el boton
    listadoContactos.addEventListener('click', eliminarContacto);
}

function leerFormulario(e) {
    e.preventDefault();
    
    //Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;
    
    if (nombre === '' || empresa === '' || telefono === ''){
        //2 parametros: texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
    } else {
        //pasa la validacion crear llamado a AJAX
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        //console.log(...infoContacto);

        if (accion === 'crear') {
            //se crea un nuevo contacto
            insertarBD(infoContacto);
        } else {
            //editar el contacto
        }

    }
}

//Insercion en la base de datos via ajax
function insertarBD(datos) {
    //llamado a ajax
    //crear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
    //pasar los datos
    xhr.onload = function() {
        if (this.status == 200) {
            //se lee la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            //console.log(respuesta);
            
            //Insertar un nuevo elemento  la tabla (tabla que se muestra en la pagina)
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //Crear un contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //Crear el icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //Crear el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.classList.add('btn-editar', 'btn');
            btnEditar.href = `editar.php?id= ${respuesta.datos.id}`;

            //Agregarlo al padre (@contenedor acciones)
            contenedorAcciones.appendChild(btnEditar);

            //Crear el icono eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //Crear el boton para eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id);
            btnEliminar.classList.add('btn-borrar', 'btn');
            
            //Agregarlo al padre (@contenedor acciones)
            contenedorAcciones.appendChild(btnEliminar);

            //Agragar el contenedor(@contenedorAcciones) de los botones al tr(@nuevo contacto)
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregar al listado de registros
            listadoContactos.appendChild(nuevoContacto);

            //Lipiar entradas del formulario
            document.querySelector('form').reset();
            
            //Mostrar notificacion
            mostrarNotificacion('Contacto Creado Correctamente', 'correcto');
        }
    }
    //enviar los datos
    xhr.send(datos);
}

//Eliminar contacto
function eliminarContacto(e) {
    //console.log(e.target); e.target -> sirve para identificar qué elemento dispara el evento (en este caso a qué elemento se le hizo click)
    //console.log(e.target.parentElement.classList.contains('btn-borrar')); .parent -> trae el elemento padre sobre el cuál estamos parados -- .contains() -> devuelve true si contiene el argumento que le pasamos
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        //Tomar el ID
        const id = e.target.parentElement.getAttribute('data-id'); // .getAttribute(atributo) -> trae el valor del atributo que se le pide
        
        //Solicitud de confirmacion
        const respuesta = confirm('El contacto se eliminará permanentemente. ¿Continuar?');

        if (respuesta) {
            //llamado a Ajax
            //crear el objeto
            const xhr = new XMLHttpRequest();
            //abrir la conexión
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            //leer la respuesta
            xhr.onload = function() {
                if (this.status == 200) {
                    const resultado = JSON.parse(xhr.responseText);
                    
                    if (resultado.respuesta == 'correcto') {
                        //Eliminar el registro del DOM
                        e.target.parentElement.parentElement.parentElement.remove();

                        //Mostrar notificacion
                        mostrarNotificacion('Contacto eliminado', 'correcto');
                    } else {
                        //Mostrar notificación
                        mostrarNotificacion('Hubo un error...', 'error');
                    }
                }
            }
            //enviar la petición
            xhr.send();
        }
    }
}

//Notificacion en pantalla 
function mostrarNotificacion(mensaje, clase) {
    
    //Crar la notificaion
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario (insertar la notificacion en el documento)
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 4000);
        }, 3000);
    }, 100);
}
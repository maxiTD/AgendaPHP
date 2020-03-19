const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
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
        mostrarNotificacion('Contacto Agregado Correctamente', 'correcto');
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
    //pasar los datos
    //enviar los datos
    xhr.send(datos);
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
<?php 
    //credenciales de la base de datos
    define('DB_USUARIO', 'root');
    define('DB_PASSWORD', '113415');
    define('DB_HOST', 'localhost');
    define('DB_NOMBRE', 'agendaphp');

    $conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE);//iría un 5to parámetro, el PUERTO. en caso de que por defecto quiera buscar en algun otro.
    
    //prueba de conexion
    echo $conn->ping(); 
?>
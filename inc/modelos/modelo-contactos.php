<?php 

    if ($_POST['accion'] == 'crear'){
        //se crea nuevo registro en la db
        require_once('../funciones/bd.php'); //se importa la conexion (@conn)

        //validar las entradas
            //FILTER_SANITIZE_STRING elimina etiquetas html y demas para que no se inserte codigo malicioso
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    
        //se intenta hacer la insercion en la db (try). En caso de que falle (catch), @respuesta va a contener un mensaje de error, si se inserta correctamente @respuesta va a contener un mensaje de confirmación  
        try {
            //prepare statement
            $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $nombre, $empresa, $telefono);
            $stmt->execute();
            if ($stmt->affected_rows == 1) { //affected_rows es una forma de saber si hubo cambios en la base de datos
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'datos' => array(
                        'id' => $stmt->insert_id,
                        'nombre' => $nombre,
                        'empresa' => $empresa,
                        'telefono' => $telefono
                    )
                );
            }
            $stmt->close();
            $conn->close();
        } catch(Exception $e) {
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    } 

    if ($_GET['accion'] == 'borrar') {
        require_once('../funciones/bd.php'); //se importa la conexion (@conn)

        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $stmt = $conn->prepare("DELETE FROM contactos WHERE id = ? ");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            if ($stmt->affected_rows == 1) {
                 $respuesta = array (
                     'respuesta' => 'correcto'
                 );
            }
            $stmt->close();
            $conn->close();
        } catch (Exception $e) {
            $respuesta = array (
                'error' => $e->getMessage() 
            );
        }
        echo json_encode($respuesta);
    }

    if ($_POST['accion'] == 'editar') {
        //echo json_encode($_POST);
        require_once('../funciones/bd.php'); //se importa la conexion (@conn)
        
        //validar las entradas
        //FILTER_SANITIZE_STRING elimina etiquetas html y demas para que no se inserte codigo malicioso
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
        $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $stmt = $conn->prepare("UPDATE contactos SET nombre = ?, empresa = ?, telefono = ? WHERE id = ?");
            $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
            $stmt->execute();
            if ($stmt->affected_rows == 1) {
                $respuesta = array (
                    'respuesta' => 'correcto'
                );
            }
            $stmt->close();
            $conn->close();
        } catch (Exception $e) {
            $respuesta = array (
                'error' => $e->getMessage() 
            );
        }
        echo json_encode($respuesta);
    }
?>
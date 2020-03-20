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
        tri {
            //prepare statement
            $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
            $stmt->bin_param("sss", $nombre, $empresa, $telefono);
            $stmt->execute();
            $respuesta = array(
                'respuesta' => 'correcto',
                'info' => $stmt
            );
            $stmt->close();
            $conn->close();
        } catch(Exception $e) {
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }

        echo json_encode($respuesta);
    }
    
?>

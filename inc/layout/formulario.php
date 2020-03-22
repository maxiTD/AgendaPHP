<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text"
            placeholder="Nombre Contacto" 
            id="nombre"
            value="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : ''; ?>"
            <?php // operador ternario(if) -> (condicion) ? accion en caso de TRUE : accion en caso de FALSE ?>
        >
    </div>

    <div class="campo">
        <label for="empresa"> Empresa:</label>
        <input 
            type="text" 
            placeholder="Nombre Empresa"
            id="empresa"
            value="<?php echo ($contacto['empresa']) ? $contacto['empresa'] : ''; ?>"
        >
    </div>

    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input 
            type="tel" 
            placeholder="Número de Tel" 
            id="telefono"
            value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>"
        >
    </div>
</div>

<div class="campo enviar">
    <?php 
        //Compruebo si se está editando o creando, como todos los campos son obligatorios, si alguno está completo es porque se está editando
        $textoBtn = ($contacto['telefono']) ? 'Guardar' : 'Añadir'; 
        $accion = ($contacto['telefono']) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php 
        if (isset($contacto['id'])) { // isset -> devuelve FALSE si la variable está definida como NULL ?>
            <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php } ?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>
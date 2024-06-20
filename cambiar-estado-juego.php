<?php
// Iniciar la sesión
session_start();

ini_set('display_errors', 0);

// Incluir la conexión a la base de datos
include '../../db_conexion.php';

// Recibe el estado del juego desde la solicitud AJAX
$estadoJuego = $_POST['estadoJuego'];
$id_usuario = $_SESSION['id'];

// Prepara la consulta SQL para actualizar el estado del juego en la base de datos
$sql = "UPDATE usuarios SET estado_juego = ? WHERE id = ?";

// Prepara la declaración
$stmt = $conexion->prepare($sql);

// Vincula los parámetros
$stmt->bind_param("ii", $estadoJuego, $id_usuario);

// Ejecuta la declaración
$stmt->execute();

// Verifica si se actualizó el estado del juego
if ($stmt->affected_rows > 0) {
    // Devuelve el estado del juego
    echo json_encode(['success' => true, 'estadoJuego' => $estadoJuego]);
} else {
    // Devuelve un error
    echo json_encode(['success' => false, 'error' => 'Error al cambiar el estado del juego: ' . $conexion->error]);
}

// Cierra la declaración y la conexión
$stmt->close();
$conexion->close();
?>
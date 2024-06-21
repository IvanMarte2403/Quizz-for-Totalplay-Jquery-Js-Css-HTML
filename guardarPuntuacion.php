<?php
session_start(); // Iniciar sesión para acceder a las variables de sesión

// Conectar a la base de datos
include '../../db_conexion.php';

// Verificar conexión
if ($conexion->connect_error) {
    die("La conexión falló: " . $conexion->connect_error);
}

// Asegurarse de que el ID del usuario esté disponible en la sesión
if (!isset($_SESSION['id'])) {
    die("Usuario no identificado");
}

// Obtener la puntuación desde la solicitud POST y el ID del usuario desde la sesión
$puntaje = $_POST['puntuacionGlobal'];
$id_usuario = $_SESSION['id']; // Asumiendo que el ID del usuario se almacena así en la sesión

// Obtener la fecha y hora actual en formato MySQL
$fecha_hora = date('Y-m-d H:i:s');

// Preparar la sentencia SQL para insertar la puntuación, el ID del usuario y la fecha y hora
$sql = "INSERT INTO juego_1 (id, puntaje, fecha_hora) VALUES (?, ?, ?)";

$stmt = $conexion->prepare($sql);

// Vincular parámetros
$stmt->bind_param("iis", $id_usuario, $puntaje, $fecha_hora);

// Ejecutar y verficar el resultado
if ($stmt->execute()) {
    echo "Puntuación guardada con éxito";
} else {
    echo "Error al guardar puntuación: " . $conexion->error;
}

// Cerrar conexión
$stmt->close();
$conexion->close();
?>
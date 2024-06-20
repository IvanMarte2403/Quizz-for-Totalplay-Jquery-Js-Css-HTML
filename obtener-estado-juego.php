<?php
session_start();

include 'db_conexion.php';

$id_usuario = $_POST['id'];

$sql = "SELECT estado_juego FROM usuarios WHERE id = ?";

$stmt = $conexion->prepare($sql);

$stmt->bind_param("i", $id_usuario);

$stmt->execute();

$result = $stmt->get_result();

$estado_juego = $result->fetch_assoc()['estado_juego'];

echo json_encode(['estadoJuego' => $estado_juego]);
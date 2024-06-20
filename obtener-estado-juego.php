        <?php
        session_start();

        include '../../db_conexion.php';

        // Verifica si el ID ha sido enviado
        if(isset($_POST['id'])) {
            $id_usuario = $_POST['id'];

            $sql = "SELECT estado_juego FROM usuarios WHERE id = ?";

            $stmt = $conexion->prepare($sql);

            if($stmt) {
                $stmt->bind_param("i", $id_usuario);

                $stmt->execute();

                $result = $stmt->get_result();

                if($result->num_rows > 0) {
                    $estado_juego = $result->fetch_assoc()['estado_juego'];
                    // Asegurarse de enviar un header de tipo de contenido como JSON
                    header('Content-Type: application/json');
                    echo json_encode(['estadoJuego' => $estado_juego]);
                } else {
                    // Asegurarse de enviar un header de tipo de contenido como JSON
                    header('Content-Type: application/json');
                    echo json_encode(['error' => 'No se encontró el usuario.']);
                }
            } else {
                // Asegurarse de enviar un header de tipo de contenido como JSON
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Error al preparar la consulta.']);
            }
        } else {
            // Asegurarse de enviar un header de tipo de contenido como JSON
            header('Content-Type: application/json');
            echo json_encode(['error' => 'ID de usuario no proporcionado.']);
        }
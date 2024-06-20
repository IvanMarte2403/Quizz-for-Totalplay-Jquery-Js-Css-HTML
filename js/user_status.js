 // Realiza una solicitud AJAX para obtener el estado del juego
 fetch('../obtener-estado-juego.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'id=' + encodeURIComponent(idDelUsuario), // Asegúrate de tener la variable idUsuario definida
  })
  .then(response => response.json())
  .then(data => {
    // Verifica si el estado del juego es 1
    if (data.estadoJuego == 1) {
      // No permitir girar
      document.querySelector('.contenedor-imagen').style.display = 'none';
      document.querySelector('#contador-giros').style.display = 'none';
      // Mostrar mensaje en #contenedor-preguntas
      document.querySelector('.quizzSeleccionado').innerText = 'Ya has completado el reto';
      document.querySelector('.vara').style.display = 'none';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
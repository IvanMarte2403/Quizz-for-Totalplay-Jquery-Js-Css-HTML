// Realiza una solicitud AJAX para obtener el estado del juego


if (question1 = 0) {
fetch('obtener-estado-juego.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'id=' + encodeURIComponent(idDelUsuario),
})
.then(response => {
  if (!response.ok) {
    throw new Error('La respuesta de la red no fue ok');
  }
  return response.json();
})
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

}
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


function actualizarEstadoJuego(estadoJuego) {
  fetch('../cambiar-estado-juego.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'estadoJuego=' + encodeURIComponent(estadoJuego),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      console.log('Estado del juego actualizado con éxito');
    } else {
      console.log('Error al actualizar el estado del juego: ' + data.error);
    }
  })
  .catch((error) => {
    if (error instanceof SyntaxError) {
      console.error('La respuesta no es un JSON válido:', error);
    } else {
      console.error('Error:', error);
    }
  });
} //Terminación de función actualizarEstadoJuego
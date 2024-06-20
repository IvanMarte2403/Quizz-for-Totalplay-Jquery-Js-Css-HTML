
document.addEventListener('DOMContentLoaded', (event) => {

  // ============================Declaraciones Globales============================
    

  const ruleta = document.querySelector('#ruleta');


  let giros = 0;
  let girosDisponibles = 3; 
  var categoriasJugadas = {};

  bloquearGiro = false;
  // ==========q========================Metodos======================
// Controlador del evento de clic
ruleta.addEventListener('click', function() {
  if (!bloquearGiro) { // Solo gira si bloquearGiro es false
    girar();
  }
});



  // ==================================================================================

  //Función Padre Girar 
  function girar(){

    // =======Verificar la cantidad de giros=======

    if(giros >= 3){
      //Verifica si el jugador ya ha jugado antes
      

    document.querySelector('#contenedor-preguntas').innerText = 'Has terminado el juego';
    Swal.fire({
    title: 'Has terminado el juego',
    text: 'Gracias por jugar!',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
      document.querySelector('.contenedor-imagen').style.display = 'none';
      document.querySelector('#contador-giros').style.display = 'none';
      document.querySelector('.vara').style.display = 'none';
      document.querySelector('.quizzSeleccionado').style.display = 'none';
      document.querySelector('.premio').style.display = 'none';
      actualizarEstadoJuego(1);
      return; 
    }


    // ===========Contador de Giros Disponibles============

    girosDisponibles--;
    
      
    // Actualiza el contenido de #contador-giros con girosDisponibles
    document.querySelector('#contador-giros').innerText = 'Giros disponibles: ' + girosDisponibles;
    

    
      let rand = Math.random() * 7200;
      calcular(rand);
      giros++;
      var sonido = document.querySelector('#audio');
      sonido.setAttribute('src', 'sonido/ruleta.mp3');
      // ocument.querySelectdor('.contador').innerHTML = 'TURNOS: ' + giros; 
    

        function premio(premios){
          var elemento = document.querySelector('.quizzSeleccionado');
    
         // Elimina las clases existentes
         elemento.className = '';
    
         // Agrega la clase 'quizzSeleccionado'
        elemento.classList.add('quizzSeleccionado');
    
        // Agrega una clase dependiendo del premio
          switch(premios) {
              case 'JUGADORES':
                elemento.classList.add('historia-text');
                mostrarPreguntas('historia');
               break;

              case 'ESTADIOS':
                elemento.classList.add('geografia-text');
                mostrarPreguntas('geografia');
               break;

              case 'PARTIDOS':
                elemento.classList.add('ciencia-text');
                mostrarPreguntas('ciencia');

             break

            case 'PERSONAJES':
              elemento.classList.add('deporte-text');
              mostrarPreguntas('deporte');
            break

            case 'HISTORIA':
              elemento.classList.add('arte-text');
              mostrarPreguntas('arte');
             break

        // Agrega más casos según sea necesario
      }
    
      elemento.innerHTML = premios;
    } //Termino de la función premio


  // ============Función Anidada==================

  function calcular(rand) {

    valor = rand / 360;
    valor = (valor - parseInt(valor.toString().split(".")[0]))* 360;
    ruleta.style.transform = "rotate("+rand+"deg)";


    console.log(valor);

    setTimeout(() => {
    switch (true) {
      case valor > 0 && valor <= 72:
      premio("JUGADORES");
      break;
      case valor > 72 && valor <= 144:
      premio("ESTADIOS");
      break;
      case valor > 144 && valor <= 216:
      premio("PARTIDOS"); 
      break; 
      case valor > 216 && valor <= 288:
      premio("PERSONAJES");
      break;
      case valor > 278 && valor <= 360:
      premio("HISTORIA");
      break; 
      
    }

  }, 5000);

  } //Termino de la función calcular 
  }

  var estadoJuego = 1;
  //Declaración Global


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


  // ======================Declaración Partidas Jugadas=================
  var puntuacion = 0;
  var categoriasJugadas = {};
  var contenedorPreguntas = document.querySelector('#contenedor-preguntas');


  function mostrarPreguntas(categoria) {


      //CONDICIÓN: Si la categoría ya ha sido jugada

      if (categoriasJugadas[categoria]) {

        contenedorPreguntas.innerHTML = 'Esta categoría ya ha sido jugada. </br> Gira Nuevamente';
      
        giros = giros -1;
        girosDisponibles = girosDisponibles + 1; 
        setTimeout(function() {
          contenedorPreguntas.innerHTML = ''; // Limpia el mensaje
          girar();
        }, 20000);
        return;
      }
      categoriasJugadas[categoria] = true;


    let preguntasSeleccionadas = [...preguntas[categoria]];
    preguntasSeleccionadas.sort(() => Math.random() - 0.5); // Mezcla las preguntas
  
    let contenedorTemporizador = document.querySelector('#temporizador-pregunta');
    let contenedorRespuestas = document.querySelector('#contenedor-respuestas'); // Mueve esta línea aquí
    let puntajeTotal = document.querySelector('#puntaje-total'); // Selecciona el elemento de puntuación total
    let preguntaActual = 0;
    let temporizador;

    contenedorPreguntas.style.display = 'block'; // Muestra el contenedor de preguntas  

    
    function mostrarPregunta() {
      // Detiene el temporizador anterior si existe
      if (temporizador) {
        clearInterval(temporizador);
      }

    bloquearGiro = true; // Bloquea el giro



    // Comprueba si ya se han mostrado todas las preguntas
  if (preguntaActual >= preguntasSeleccionadas.length) {

    contenedorPreguntas.innerHTML = 'La categoría ha finalizado. </br> Gira Nuevamente';
    bloquearGiro = false; // Bloquea el giro


    contenedorRespuestas.innerHTML = ''; // Limpia las respuestas

    // Encuentra el contenedor del botón y el enlace dentro del contenedor
    var contenedorBoton = document.getElementById('contenedor-boton');
    var enlace =  document.getElementById('boton-guardar');

    // Muestra el contenedor del botón
    contenedorBoton.style.display = 'block';

    // Agrega un evento de clic al enlace
    enlace.addEventListener('click', function(event) {
      // Previene la acción por defecto del enlace
      event.preventDefault();

      // Imprime "Guardar & Salir" en la consola
      window.puntuacionGlobal = puntuacion; // Guarda la puntuación global
    
    // Enviar la puntuación global a guardar-puntaje.php
    fetch('../guardar-puntaje.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'puntaje=' + encodeURIComponent(window.puntuacionGlobal),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Puntuación guardada con éxito');
      } else {
        console.log('Error al guardar la puntuación: ' + data.error);
      }
    });


      puntuacion = 0; // Reinicia la puntuación
      puntajeTotal.textContent = 'Puntuación total: ' + puntuacion; // Actualiza la puntuación total

      // Muestra un mensaje de éxito
      enlace.textContent = 'Puntuación guardada';
      enlace.style.color = 'green';

  

    });

    return;
  }

      // Selecciona la pregunta actual
      let pregunta = preguntasSeleccionadas[preguntaActual];

      // Muestra la pregunta
      contenedorPreguntas.innerHTML = pregunta.pregunta;

      // Muestra las respuestas
      contenedorRespuestas.innerHTML = '';
      pregunta.respuestas.forEach((respuesta, index) => {
        let p = document.createElement('p');
        p.textContent = respuesta;

        // Agrega un evento click a cada respuesta
        p.addEventListener('click', () => {
          // Verifica si la respuesta es correcta
          if (index === pregunta.respuestaCorrecta) {
            p.classList.add('correcto_respuesta');
            puntuacion += 500; // Incrementa la puntuación
            puntajeTotal.textContent = 'Puntuación total: ' + puntuacion; // Actualiza la puntuación total
          
      
          } else {
            p.classList.add('incorrecto_respuesta');
          }

          // Detiene el temporizador
          clearInterval(temporizador);

          // Espera 1 segundo y luego pasa a la siguiente pregunta
          setTimeout(mostrarPregunta, 1000);
        });

        contenedorRespuestas.appendChild(p);
      });

      // Muestra el temporizador
      contenedorTemporizador.style.display = 'block';
      let tiempoRestante = 15;
      contenedorTemporizador.innerHTML = tiempoRestante;

      temporizador = setInterval(() => {
        tiempoRestante--;
        contenedorTemporizador.innerHTML = tiempoRestante;

        if (tiempoRestante <= 0) {
          clearInterval(temporizador);
          // Pasa a la siguiente pregunta
          mostrarPregunta();
        }
      }, 1000);

      // Incrementa la pregunta actual
      preguntaActual++;
    }

    // Comienza mostrando la primera pregunta
    mostrarPregunta();
  }// =================Termino de mostrarPreguntas()



  });
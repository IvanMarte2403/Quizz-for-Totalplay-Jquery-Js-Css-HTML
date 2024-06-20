const ruleta = document.querySelector('#ruleta');


// ======Función de funcionamiento=======
ruleta.addEventListener('click', girar);
giros = 0;
let girosRestantes  = 3;
var categoriasJugadas = {};
var contenedorPreguntas = document.getElementById('contenedor-preguntas');



function girar(){

let rand = Math.random() * 7200;
calcular(rand);
giros++;
var sonido = document.querySelector('#audio');
sonidos.setAttribute('src', 'sonido/ruleta.mp3');
// ocument.querySelectdor('.contador').innerHTML = 'TURNOS: ' + giros; 
 
 



  function premio(premios){
    var elemento = document.querySelector('.quizzSeleccionado');
  
    // Elimina las clases existentes
    elemento.className = '';
  
    // Agrega la clase 'quizzSeleccionado'
    elemento.classList.add('quizzSeleccionado');
  
    // Agrega una clase dependiendo del premio
    switch(premios) {
      case 'Historia':
        elemento.classList.add('historia-text');
        mostrarPreguntas('historia');
        break;
      case 'Geografía':
        elemento.classList.add('geografia-text');
        mostrarPreguntas('geografia');
        break;
     case 'Ciencia':
        elemento.classList.add('ciencia-text');
        mostrarPreguntas('ciencia');

      break
     case 'Deportes':
        elemento.classList.add('deporte-text');
        mostrarPreguntas('deporte');
      break
     case 'Arte':
        elemento.classList.add('arte-text');
        mostrarPreguntas('arte');
      break
      // Agrega más casos según sea necesario
    }
  
    elemento.innerHTML = premios;
  } 


 function calcular(rand) {

  valor = rand / 360;
  valor = (valor - parseInt(valor.toString().split(".")[0]))* 360;
  ruleta.style.transform = "rotate("+rand+"deg)";


  console.log(valor);

  setTimeout(() => {
  switch (true) {
    case valor > 0 && valor <= 72:
     premio("Historia");
     break;
     case valor > 72 && valor <= 144:
     premio("Geografía");
     break;
     case valor > 144 && valor <= 216:
     premio("Ciencia"); 
     break; 
     case valor > 216 && valor <= 288:
     premio("Arte");
     break;
     case valor > 278 && valor <= 360:
     premio("Deportes");
     break; 
     
  }

 }, 5000);

}
}

var puntuacion = 0; 

function mostrarPreguntas(categoria) {
  console.log(categoriasJugadas);

  
    //CONDICIÓN: Si la catego ría ya ha sido jugada

    if (categoriasJugadas[categoria]) {
    
      giros = giros -1;
      girosRestantes = girosRestantes + 1; // Corrección: la variable debe ser girosRestantes, no girosDisponibles
      setTimeout(function() {
          contenedorPreguntas.innerHTML = ''; // Limpia el mensaje
          contenedorPreguntas.innerHTML = 'Esta categoría ya ha sido jugada. </br> Gira Nuevamente';
          girar();
      }, 2000);
      return;
  }
  categoriasJugadas[categoria] = true;




  let preguntasSeleccionadas = [...preguntas[categoria]];
  preguntasSeleccionadas.sort(() => Math.random() - 0.5); // Mezcla las preguntas
  let contenedorPreguntas = document.querySelector('#contenedor-preguntas');
  let contenedorTemporizador = document.querySelector('#temporizador-pregunta');
  let contenedorRespuestas = document.querySelector('#contenedor-respuestas'); // Mueve esta línea aquí
  let puntajeTotal = document.querySelector('#puntaje-total'); // Selecciona el elemento de puntuación total
  let preguntaActual = 0;
  let temporizador;
  
  contenedorPreguntas.style.display = 'block';


  function mostrarPregunta() {
    // Detiene el temporizador anterior si existe
    if (temporizador) {
      clearInterval(temporizador);
    }

  // Comprueba si ya se han mostrado todas las preguntas
if (preguntaActual >= preguntasSeleccionadas.length) {
  contenedorPreguntas.innerHTML = 'La categoría ha finalizado. </br> Gira Nuevamente';
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
    window.parent.postMessage(puntuacion, '*');
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
}
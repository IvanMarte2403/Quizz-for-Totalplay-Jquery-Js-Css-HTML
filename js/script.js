const ruleta = document.querySelector('#ruleta');

ruleta.addEventListener('click', girar);
giros = 0;



function girar(){
  if (giros < 3) {
    let rand = Math.random() * 7200;
    calcular(rand);
    giros++;
    var sonido = document.querySelector('#audio');
    sonido.setAttribute('src', 'sonido/ruleta.mp3');
    // ocument.querySelectdor('.contador').innerHTML = 'TURNOS: ' + giros; 
  }else{
    Swal.fire({
      icon: 'success',
      title: 'VUELVA PRONTO EL JUEGO TERMINO!!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if (result.value == true) {
        giros = 0;
         document.querySelector('.quizzSeleccionado').innerHTML = ' ';
         document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros;        
      }
    })
  }


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

function mostrarPreguntas(categoria) {
  let preguntasSeleccionadas = [...preguntas[categoria]];
  preguntasSeleccionadas.sort(() => Math.random() - 0.5); // Mezcla las preguntas
  let contenedorPreguntas = document.querySelector('#contenedor-preguntas');
  let contenedorTemporizador = document.querySelector('#temporizador-pregunta');
  let contenedorRespuestas = document.querySelector('#contenedor-respuestas'); // Mueve esta línea aquí
  let preguntaActual = 0;
  let temporizador;

  function mostrarPregunta() {
    // Detiene el temporizador anterior si existe
    if (temporizador) {
      clearInterval(temporizador);
    }

    // Comprueba si ya se han mostrado todas las preguntas
    if (preguntaActual >= preguntasSeleccionadas.length) {
      contenedorPreguntas.innerHTML = 'La categoría ha finalizado.';
      contenedorRespuestas.innerHTML = ''; // Limpia las respuestas
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
        contenedorTemporizador.style.display = 'none';
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
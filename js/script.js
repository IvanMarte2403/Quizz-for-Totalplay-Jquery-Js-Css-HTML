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
    document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros; 
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
        break;
      case 'Geografía':
        elemento.classList.add('geografia-text');
        break;
     case 'Ciencia':
        elemento.classList.add('ciencia-text');
      break
     case 'Deportes':
        elemento.classList.add('deporte-text');
      break
     case 'Arte':
        elemento.classList.add('arte-text');
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
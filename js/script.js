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

  document.querySelector('.quizzSeleccionado').innerHTML = premios;

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

# Wiki: 
https://bramble-turret-5f8.notion.site/d50184f53b6840b29db05129ae0245e5?v=d7f696520c4c42edb201d3b8480220e7&pvs=74
# Documentación del Juego para Totalplay

Este repositorio contiene el código y la documentación para el juego desarrollado para Totalplay, que utiliza tecnologías como jQuery, JavaScript, CSS y HTML.

## Estructura del Repositorio

El código fuente está organizado en la carpeta `juego/juego-1`, donde encontrarás los scripts y estilos específicos utilizados en el juego.

### Funciones Principales

#### Giros Disponibles

El juego permite al jugador girar varias veces o tener giros infinitos dependiendo de la configuración inicial:

    // Puede el jugador jugar múltiples veces
    question1 = 1;  // 1 para múltiples veces, 0 para una sola vez

#### Temporización de Preguntas

Puedes modificar el tiempo asignado para cada pregunta directamente en el script:

    var tiempoRestante = 15; // Cambia 15 por los segundos que desees

#### Consultar y Modificar el Estado del Juego

El estado del juego del usuario se verifica y actualiza mediante solicitudes AJAX:

    fetch('obtener-estado-juego.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'id=' + encodeURIComponent(idDelUsuario),
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.estadoJuego == 1) {
        // Código para manejar si el juego ya fue jugado
      }
    });

### Animación de Giros

La animación del giro se realiza con un efecto de rotación, y los premios se determinan según el valor resultante:

    // Función para determinar el premio
    function determinaPremio(valor) {
      if (valor >= 0 && valor < 72) {
        // Llama a la función de premio para la categoría uno
      }
      // Agrega condiciones adicionales aquí
    }

### Manejo de Preguntas

La selección y mezcla de preguntas se realiza así:

    let preguntasSeleccionadas = [...preguntas[categoria]];
    preguntasSeleccionadas.sort(() => Math.random() - 0.5);

### Documentación Adicional

Para más detalles, revisa los comentarios en el código fuente, que proporcionan información adicional sobre el funcionamiento y la lógica del juego.

## Contribuciones

Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio y envía tus pull requests para revisión.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` en este repositorio para más información.

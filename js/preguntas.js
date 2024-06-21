  //Define the name of your categories

  var categoryOne = 'historia'
  var categoryTwo = 'geografia'
  var categoryThree = 'ciencia'
  var categoryFour = 'arte'
  var categoryFive = 'deporte'




  let preguntas = {
    'historia': [
        { 
            pregunta: '¿En qué año se celebró oficialmente el Día del Padre por primera vez en México?', 
            respuestas: ['1927', '1950', '1972'], 
            respuestaCorrecta: 1 
        },
        { 
            pregunta: '¿Quién fue el presidente de EE. UU. que firmó la ley que reconocía el Día del Padre como festividad nacional?', 
            respuestas: ['Richard Nixon', 'Franklin D. Roosevelt', 'Lyndon B. Johnson'], 
            respuestaCorrecta: 0 
        },
        { 
            pregunta: '¿Cuál es el origen de la celebración moderna del Día del Padre?', 
            respuestas: ['Un evento religioso en Europa', 'Una propuesta de Sonora Smart Dodd en EE. UU.', 'Una tradición de los pueblos nórdicos'], 
            respuestaCorrecta: 1 
        }
    ],
    'geografia': [
        { 
            pregunta: '¿En qué país se celebra el Día del Padre el 19 de marzo?', 
            respuestas: ['Italia', 'México', 'Australia'], 
            respuestaCorrecta: 0 
        },
        { 
            pregunta: '¿Qué país latinoamericano celebra el Día del Padre el tercer domingo de junio?', 
            respuestas: ['Brasil', 'Argentina', 'México'], 
            respuestaCorrecta: 2 
        },
        { 
            pregunta: '¿En qué país no es oficial el Día del Padre, pero se celebra ampliamente?', 
            respuestas: ['Finlandia', 'Indonesia', 'Rusia'], 
            respuestaCorrecta: 1 
        }
    ],
    'ciencia': [
        { 
            pregunta: '¿Qué estudio sugiere que la participación activa del padre en la crianza mejora el desarrollo cognitivo del niño?', 
            respuestas: ['Estudio de Cambridge 2005', 'Investigación de Harvard 2010', 'Análisis de Stanford 2003'], 
            respuestaCorrecta: 1 
        },
        { 
            pregunta: 'Desde la psicología, ¿Qué efecto tiene la figura paterna en la seguridad emocional de los niños?', 
            respuestas: ['Incrementa la confianza', 'Disminuye la ansiedad', 'Ambas son correctas'], 
            respuestaCorrecta: 2 
        },
        { 
            pregunta: '¿Qué hormona es conocida por aumentar en hombres que se convierten en padres y está asociada con el comportamiento paternal?', 
            respuestas: ['Testosterona', 'Oxitocina', 'Adrenalina'], 
            respuestaCorrecta: 1 
        }
    ],
    'arte': [
        { 
            pregunta: '¿Qué famoso pintor retrató la figura paterna en su obra "Vuelo nocturno" destacando la protección?', 
            respuestas: ['Pablo Picasso', 'Vincent van Gogh', 'Chagall'], 
            respuestaCorrecta: 2 
        },
        { 
            pregunta: '¿Qué película mexicana famosa aborda la relación entre padre e hijo en un contexto de viaje?', 
            respuestas: ['Y tu mamá también', 'Amores Perros', 'Nosotros los Nobles'], 
            respuestaCorrecta: 0 
        },
        { 
            pregunta: '¿Qué canción de Vicente Fernández es un himno no oficial del Día del Padre en México?', 
            respuestas: ['Mujeres Divinas', 'Mi querido viejo', 'Estos Celos'], 
            respuestaCorrecta: 1 
        }
    ],
    'deporte': [
        { 
            pregunta: '¿Qué evento deportivo internacional a menudo coincide con el Día del Padre en años específicos?', 
            respuestas: ['La Copa del Mundo', 'Los Juegos Olímpicos', 'Wimbledon'], 
            respuestaCorrecta: 0 
        },
        { 
            pregunta: '¿Cuál es una actividad deportiva popular para celebrar el Día del Padre en México?', 
            respuestas: ['Partido de fútbol', 'Carrera de 5K', 'Juego de béisbol'], 
            respuestaCorrecta: 2 
        },
        { 
            pregunta: '¿Qué famoso golfista ganó un torneo importante en el Día del Padre, destacando la relación con su hijo?', 
            respuestas: ['Tiger Woods', 'Phil Mickelson', 'Jack Nicklaus'], 
            respuestaCorrecta: 0 
        }
    ]
};

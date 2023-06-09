import { Component } from '@angular/core';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.component.html',
  styleUrls: ['./instalaciones.component.css']
})
export class InstalacionesComponent {
  title = 'Polideportivo ABC';

  installations = [
    {
      name: 'Piscina Olímpica',
      description: 'Nuestra piscina olímpica de tamaño completo ofrece ocho carriles para nadar y un trampolín de buceo. El agua se mantiene a una temperatura constante de 28 grados Celsius para una comodidad óptima. Perfecta para nadadores competitivos y aficionados.',
      image: 'ruta/a/tu/imagen/piscina.jpg'
    },
    {
      name: 'Cancha de Fútbol',
      description: 'Nuestra cancha de fútbol de tamaño completo está equipada con césped artificial de alta calidad, iluminación de alta intensidad para juegos nocturnos y asientos para espectadores. Es el lugar ideal para partidos de fútbol y entrenamientos.',
      image: 'ruta/a/tu/imagen/futbol.jpg'
    },
    {
      name: 'Cancha de Tenis',
      description: 'Nuestras canchas de tenis cuentan con superficies de arcilla, hierba y dura, lo que permite a los jugadores practicar en su superficie preferida. Las canchas están bien mantenidas y la iluminación permite partidos durante las noches.',
      image: 'ruta/a/tu/imagen/tenis.jpg'
    },
    {
      name: 'Gimnasio',
      description: 'Nuestro gimnasio totalmente equipado cuenta con una amplia gama de máquinas de cardio y pesas, así como un área de entrenamiento en circuito. También ofrecemos clases de fitness grupal y entrenamiento personal.',
      image: 'ruta/a/tu/imagen/gimnasio.jpg'
    },
    {
      name: 'Cancha de Baloncesto',
      description: 'Nuestra cancha de baloncesto interior cuenta con suelo de madera de arce, iluminación de alta intensidad y asientos para espectadores. También disponemos de balones de baloncesto para su uso.',
      image: 'ruta/a/tu/imagen/baloncesto.jpg'
    },
    {
      name: 'Pista de Atletismo',
      description: 'Nuestra pista de atletismo al aire libre cuenta con 8 carriles, una superficie de tartán y todas las instalaciones necesarias para los eventos de pista y campo. Además, está equipada con gradas para los espectadores.',
      image: 'ruta/a/tu/imagen/atletismo.jpg'
    },
    {
      name: 'Cancha de Squash',
      description: 'Nuestras canchas de squash están equipadas con paredes de cristal de tamaño reglamentario, una buena iluminación y aire acondicionado. También ofrecemos alquiler de raquetas y pelotas de squash.',
      image: 'ruta/a/tu/imagen/squash.jpg'
    },
    {
      name: 'Cancha de Voleibol',
      description: 'Nuestra cancha de voleibol al aire libre cuenta con una superficie de arena bien cuidada y una red de voleibol de altura ajustable. Perfecto para partidos amistosos o competitivos.',
      image: 'ruta/a/tu/imagen/voleibol.jpg'
    }
    // Agrega aquí más instalaciones
  ];

}

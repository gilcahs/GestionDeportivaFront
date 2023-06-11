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
      image: 'https://www.cmdsport.com/app/uploads/2022/10/piscina-cubierta-sant-jordi.jpg'
    },
    {
      name: 'Cancha de Fútbol',
      description: 'Nuestra cancha de fútbol de tamaño completo está equipada con césped artificial de alta calidad, iluminación de alta intensidad para juegos nocturnos y asientos para espectadores. Es el lugar ideal para partidos de fútbol y entrenamientos.',
      image: 'https://donpotrero.com/img/posts/2/medidas_lg.jpg'
    },
    {
      name: 'Cancha de Tenis',
      description: 'Nuestras canchas de tenis cuentan con superficies de arcilla, hierba y dura, lo que permite a los jugadores practicar en su superficie preferida. Las canchas están bien mantenidas y la iluminación permite partidos durante las noches.',
      image: 'https://civideportes.com.co/wp-content/uploads/2020/08/asphalt-tennis-court-5354328_640.jpg'
    },
    {
      name: 'Gimnasio',
      description: 'Nuestro gimnasio totalmente equipado cuenta con una amplia gama de máquinas de cardio y pesas, así como un área de entrenamiento en circuito. También ofrecemos clases de fitness grupal y entrenamiento personal.',
      image: 'https://estaticos-cdn.prensaiberica.es/clip/5bb23ba5-7294-4e95-b414-de6d82968ed2_16-9-aspect-ratio_default_0.jpg'
    },
    {
      name: 'Cancha de Baloncesto',
      description: 'Nuestra cancha de baloncesto interior cuenta con suelo de madera de arce, iluminación de alta intensidad y asientos para espectadores. También disponemos de balones de baloncesto para su uso.',
      image: 'https://integralspor.com/uploads/blog/detail/162445d5fbd2b893161.jpg'
    },
    {
      name: 'Pista de Atletismo',
      description: 'Nuestra pista de atletismo al aire libre cuenta con 8 carriles, una superficie de tartán y todas las instalaciones necesarias para los eventos de pista y campo. Además, está equipada con gradas para los espectadores.',
      image: 'https://calahorra.es/wp-content/uploads/6.-WhatsApp-Image-2022-04-27-at-3.43.35-PM-1.jpeg'
    },
    {
      name: 'Cancha de Badminton',
      description: 'Nuestras canchas de squash están equipadas con paredes de cristal de tamaño reglamentario, una buena iluminación y aire acondicionado. También ofrecemos alquiler de raquetas y pelotas de squash.',
      image: 'https://integralspor.com/uploads/blog/detail/161d68f72ea59771229.jpg'
    },
    {
      name: 'Cancha de Voleibol',
      description: 'Nuestra cancha de voleibol al aire libre cuenta con una superficie de arena bien cuidada y una red de voleibol de altura ajustable. Perfecto para partidos amistosos o competitivos.',
      image: 'https://luismiguelguerrero.files.wordpress.com/2010/04/volley.jpeg?w=624'
    }
    // Agrega aquí más instalaciones
  ];

}

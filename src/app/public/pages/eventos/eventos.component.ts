import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  events = [
    {
      name: 'Torneo de Natación',
      date: new Date(2023, 7, 12),
      location: 'Piscina Olímpica',
      image: 'https://www.hoyodemanzanares.es/wp-content/uploads/2018/08/imagen-torneo-natacion-2018.jpg',
      description: 'Únete a nosotros para el Torneo de Natación anual. Este emocionante evento contará con nadadores de todo el país compitiendo en una serie de eventos. No te pierdas la oportunidad de ver a algunos de los mejores talentos de la natación en acción.'
    },
    {
      name: 'Competencia de Fútbol',
      date: new Date(2023, 8, 8),
      location: 'Cancha de Fútbol',
      image: 'https://guadared.com/medios/2023/05/Torneo-de-Futbol-7-Alejandro-Moza-Emocion-y-Competencia-en-Guadalajara.jpg',
      description: 'Ven a ver a los equipos locales competir en nuestra Competencia de Fútbol anual. Este torneo promete mucha emoción y talento, con equipos de toda la región compitiendo por el título.'
    },
    {
      name: 'Campeonato de Tenis',
      date: new Date(2023, 9, 15),
      location: 'Canchas de Tenis',
      image: 'https://aytomengibar.com/wp-content/uploads/2021/06/careta-torneo-tenis-verano-2021.jpg',
      description: 'Acompáñanos en el Campeonato de Tenis anual. Este torneo contará con talentosos jugadores de todo el país compitiendo en una serie de partidos emocionantes. No te pierdas la oportunidad de ver a algunos de los mejores talentos del tenis en acción.'
    },

    {
      name: 'Competencia de Baloncesto',
      date: new Date(2023, 11, 5),
      location: 'Cancha de Baloncesto',
      image: 'https://agendahidalguense.files.wordpress.com/2022/01/en-zempoala-invitan-a-jovenes-a-participar-en-torneo-municipal-de-basquetbol.jpeg',
      description: 'Ven a ver a los equipos locales competir en nuestra Competencia de Baloncesto anual. Este torneo promete mucha emoción y talento, con equipos de toda la región compitiendo por el título.'
    }
    // more events...
];


}

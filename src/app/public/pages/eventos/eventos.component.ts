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
      description: 'Únete a nosotros para el Torneo de Natación anual. Este emocionante evento contará con nadadores de todo el país compitiendo en una serie de eventos. No te pierdas la oportunidad de ver a algunos de los mejores talentos de la natación en acción.'
    },
    {
      name: 'Competencia de Fútbol',
      date: new Date(2023, 8, 8),
      location: 'Cancha de Fútbol',
      description: 'Ven a ver a los equipos locales competir en nuestra Competencia de Fútbol anual. Este torneo promete mucha emoción y talento, con equipos de toda la región compitiendo por el título.'
    },
    // more events...
  ];

}

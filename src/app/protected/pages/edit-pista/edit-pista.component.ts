import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/public/interfaces/pistas.interface';
import { SportsService } from 'src/app/public/services/sports.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface SelectedTimes {
  horaInicio?: string;
  horaFin?: string;
}


@Component({
  selector: 'app-edit-pista',
  templateUrl: './edit-pista.component.html',
  styleUrls: ['./edit-pista.component.css']
})
export class EditPistaComponent implements OnInit {
  pista: any;
  dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  horas: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  //horasFinDisponibles: string[] = [];
  newHoraInicio?: string;
  newHoraFin?: string;
  reservasFuturas: Reserva[] = [];
  selectedTimes: { [dia: string]: SelectedTimes } = {
    'Lunes': {},
    'Martes': {},
    'Miercoles': {},
    'Jueves': {},
    'Viernes': {},
    'Sabado': {},
    'Domingo': {},
  };
  horasFinDisponibles: { [dia: string]: string[] } = {
    'Lunes': [],
    'Martes': [],
    'Miercoles': [],
    'Jueves': [],
    'Viernes': [],
    'Sabado': [],
    'Domingo': [],
  };

  constructor(private sportService: SportsService, private router: Router) { }

  ngOnInit(): void {
    this.pista = this.sportService.pistaSeleccionada;
  }

  updateHorasFin(event: Event, dia: string): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTimes[dia].horaInicio = selectElement.value;
    const index = this.horas.indexOf(this.selectedTimes[dia].horaInicio!);
    this.horasFinDisponibles[dia] = this.horas.slice(index + 1);
    this.filterUnavailableTimes(dia);
  }

  updateHoraFin(event: Event, dia: string): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTimes[dia].horaFin = selectElement.value;
  }

  isValidTimeRange(horaInicio: string, horaFin: string): boolean {
    return horaInicio < horaFin;
  }
  filterUnavailableTimes(dia: string): void {
    if (!this.pista.horariosDisponibles[dia]) {
      return;
    }

    for (let i = 0; i < this.pista.horariosDisponibles[dia].length; i++) {
      const range = this.pista.horariosDisponibles[dia][i].split('-');
      const startIndex = this.horas.indexOf(range[0]);
      const endIndex = this.horas.indexOf(range[1]);

      this.horasFinDisponibles[dia] = this.horasFinDisponibles[dia].filter(hora => {
        const horaIndex = this.horas.indexOf(hora);
        return horaIndex <= startIndex || horaIndex >= endIndex;
      });
    }
  }


  addHora(dia: string): void {
    if (!this.isValidTimeRange(this.selectedTimes[dia].horaInicio!, this.selectedTimes[dia].horaFin!)) {
      alert('La hora de inicio debe ser menor que la hora de fin');
      return;
    }

    const newHora = this.selectedTimes[dia].horaInicio + '-' + this.selectedTimes[dia].horaFin;

  // Verificar si las horas seleccionadas ya existen en el horario del día seleccionado
  if (this.pista.horariosDisponibles[dia].includes(newHora)) {
    alert('Las horas seleccionadas ya están en el horario.');
    return;
  }

  // Verificar si las horas seleccionadas se solapan con un horario existente
  const newHoraInicio = Number(this.selectedTimes[dia].horaInicio!.split(':')[0]);
  const newHoraFin = Number(this.selectedTimes[dia].horaFin!.split(':')[0]);
  for (let hora of this.pista.horariosDisponibles[dia]) {
    const [horaInicio, horaFin] = hora.split('-').map((h: string) => Number(h.split(':')[0]));
    if ((newHoraInicio >= horaInicio && newHoraInicio < horaFin) || (newHoraFin > horaInicio && newHoraFin <= horaFin)) {
      alert('Las horas seleccionadas se solapan con un horario existente.');
      return;
    }
  }

  if (!this.pista.horariosDisponibles[dia]) {
    this.pista.horariosDisponibles[dia] = [];
  }
  this.pista.horariosDisponibles[dia].push(newHora);
  }


removeHora(dia: string, hora: string): void {
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check reservations for the track
  let reservasToLog = this.pista.reservas?.filter((reserva: { fecha: string | number | Date; hora: string; }) => {
    const reservaDate = new Date(reserva.fecha!);
    reservaDate.setHours(0, 0, 0, 0);

    // Get day of the week from the reservation date
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const reservaDayOfWeek = daysOfWeek[reservaDate.getDay()];

    // Check if the reservation date is greater than or equal to today's date,
    // if the reservation hour matches the removed hour,
    // and if the reservation day of week matches the day of week the hour is being removed from
    return reservaDate.getTime() >= today.getTime() && reserva.hora === hora && reservaDayOfWeek === dia;
  });

  if (reservasToLog?.length > 0) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Hay reservas futuras para esta hora. ¿Estás seguro de que quieres eliminarla?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirmed, remove the hour and add the reservations to the global array
        const index = this.pista.horariosDisponibles[dia].indexOf(hora);
        if (index > -1) {
          this.pista.horariosDisponibles[dia].splice(index, 1);
        }
        this.reservasFuturas.push(...reservasToLog!);
        console.log(this.reservasFuturas);

      }
    })
  } else {
    // If there are no future reservations, remove the hour as usual
    const index = this.pista.horariosDisponibles[dia].indexOf(hora);
    if (index > -1) {
      this.pista.horariosDisponibles[dia].splice(index, 1);
    }
  }
}




guardarCambios(): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: this.reservasFuturas.length > 0
      ? "Has eliminado horas con reservas futuras. Al guardar los cambios, estas reservas se cancelarán y se notificará a los usuarios. ¿Estás seguro de que quieres proceder?"
      : "¿Estás seguro de que quieres guardar los cambios?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, guardar'
  }).then((result) => {
    if (result.isConfirmed) {
      // If the user confirmed, save the changes
      if (this.reservasFuturas.length > 0) {
        this.sportService.borrarReservas(this.reservasFuturas).subscribe(resp => {
          if (resp === true) {
            this.sportService.horariosPut(this.pista.uid ,this.pista.horariosDisponibles).subscribe(() => {
              // Aquí podrías navegar a la vista anterior o mostrar algún mensaje de éxito
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Los cambios se han guardado',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/SportCenter/sports']);
            });
          }else {
            Swal.fire('Error', resp, 'error')
          }

        });
      } else {
        this.sportService.horariosPut(this.pista.uid, this.pista.horariosDisponibles).subscribe(() => {
          // Aquí podrías navegar a la vista anterior o mostrar algún mensaje de éxito
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Los cambios se han guardado',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/SportCenter/deportes']);
        });
      }
    }
  });
}

eliminarPista(): void {
  Swal.fire({
    title: '¿Estás seguro de que quieres eliminar esta pista?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      const reservasPosteriorFechaActual = this.pista.reservas?.filter((reserva: { fecha: string | number | Date; }) => {
        const fechaReserva = new Date(reserva.fecha!);
        return fechaReserva >= new Date();
      });
      if (reservasPosteriorFechaActual && reservasPosteriorFechaActual.length > 0) {
        Swal.fire({
          title: 'Hay reservas para días posteriores. ¿Estás seguro de que quieres borrar esta pista y cancelar estas reservas?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar y cancelar reservas!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.reservasFuturas = reservasPosteriorFechaActual;
            this.sportService.borrarReservas(this.reservasFuturas).subscribe(resp => {

              if (resp === true) {
                this.sportService.borrarPista(this.pista.uid!).subscribe(() => {
                  Swal.fire('Eliminado!', 'La pista y las reservas han sido eliminadas.', 'success');
                  this.router.navigate(['/SportCenter/sports']);
                });
              }else {
                Swal.fire('Error', resp, 'error')
              }

            });
          }
        });
      } else {
        this.sportService.borrarPista(this.pista.uid!).subscribe(() => {
          Swal.fire('Eliminado!', 'La pista ha sido eliminada.', 'success');
          this.router.navigate(['/SportCenter/sports']);
        });
      }
    }
  });
}



}

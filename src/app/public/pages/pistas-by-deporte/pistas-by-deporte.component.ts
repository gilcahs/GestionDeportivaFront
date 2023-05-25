
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { SportsService } from '../../services/sports.service';
import { Pista, PistasResponse } from '../../interfaces/pistas.interface';

@Component({
  selector: 'app-pistas-by-deporte',
  templateUrl: './pistas-by-deporte.component.html',
  styleUrls: ['./pistas-by-deporte.component.css']
})
export class PistasByDeporteComponent implements OnInit {
  deporteId?: string;
  pistas?: PistasResponse;
  weekDays: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  currentDate: Date = new Date();
  selectedPistaId?: string;




  constructor(private route: ActivatedRoute, private http: HttpClient, private sportsService: SportsService) { }

  ngOnInit() {
    this.deporteId = this.route.snapshot.paramMap.get('_id')!
    this.sportsService.getPistasByDeporte(this.deporteId)
      .subscribe(resp  => {
        console.log(resp);

        this.pistas = resp
      })

  }

  getDayDate(index: number) {
    const targetDate = new Date(this.currentDate);
    targetDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + index);
    return formatDate(targetDate, 'dd/MM', 'en-US');
  }

  selectPista(id: string) {
    this.selectedPistaId = id;
  }
  canReserve(day: string, hora: string, pista: Pista): boolean {
    const currentDate = new Date();
    const currentDay = this.weekDays[currentDate.getDay() - 1];
    const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
    hora = hora.split('-')[0]

    // Comprobar si el día ya pasó
    if (this.weekDays.indexOf(day) < this.weekDays.indexOf(currentDay)) {
      return false;
    }

    // Comprobar si la hora ya pasó
    if (day === currentDay && hora < currentTime) {
      return false;
    }

    // Comprobar si la hora ya está reservada
    for (const reserva of pista.reservas!) {
      const reservaDate = new Date(reserva.fecha!);
      const reservaDay = this.weekDays[reservaDate.getDay() - 1];
      if (day === reservaDay && hora === reserva.hora) {
        return false;
      }
    }

    // Si ninguna de las condiciones anteriores se cumple, se puede reservar
    return true;
  }

}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { SportsService } from '../../services/sports.service';
import { Pista, PistasResponse } from '../../interfaces/pistas.interface';
import { isEmpty } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  currentWeek: number = 0; 

  reservaForm = this.fb.group({
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.email]],
  });

  




  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private sportsService: SportsService) { }

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

  nextWeek() {
    if (this.currentWeek <= 4) {
      this.currentWeek++;
      
    }
    
  }

  prevWeek() {
    if (this.currentWeek > 0) {
      this.currentWeek--;
    }
  }

  selectPista(id: string) {
    this.selectedPistaId = id;
  }

  getWeekNumber(d: Date) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    return Math.ceil((((date.valueOf() - yearStart.valueOf()) / 86400000) + 1)/7)
  }

  getPistaName(id: string): string {
    var nombre = ""
    if(this.pistas!.pistas!.length > 0) {
      const pista = this.pistas!.pistas!.find(p => p.uid === id);
      nombre =  pista ? pista.nombre! : '';
    }
    return nombre
    
  }

  getWeekRange(): string {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (7 * this.currentWeek));
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return formatDate(startOfWeek, 'dd/MM', 'en-US') + " al " + formatDate(endOfWeek, 'dd/MM', 'en-US');
  }

 

getYearWeek(date: Date): string {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return date.getFullYear() + "-" + (Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) - 1);
}

canReserve(day: string, hora: string, pista: Pista): boolean {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + (7 * this.currentWeek));
  const currentDay = this.weekDays[currentDate.getDay() - 1];
  const currentTime = currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0');
  const currentYearWeek = this.getYearWeek(currentDate);
  const dayNumbers: { [key: string]: number } = {
    'Lunes': 1,
    'Martes': 2,
    'Miercoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sabado': 6,
    'Domingo': 7,
  };

  if (this.currentWeek === 0) {   
    // Comprobar si el día ya pasó
    if (dayNumbers[day as keyof typeof dayNumbers] < dayNumbers[currentDay as keyof typeof dayNumbers]) {

      return false;
    }
  

    
    // Comprobar si la hora ya pasó
    if (day === currentDay) {
      const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
      const [horaHours, horaMinutes] = hora.split("-")[0].split(":").map(Number);
      
      if (currentHours > horaHours || (currentHours === horaHours && currentMinutes > horaMinutes)) {
        return false;
      }
    }
  }
  



  for (const reserva of pista.reservas!) {

      const reservaDate = new Date(reserva.fecha!);
      const reservaDay = this.weekDays[reservaDate.getDay() - 1];
      const reservaHora = reserva.hora;
      let reservaYearWeek = this.getYearWeek(reservaDate);
      const yearWeekParts = reservaYearWeek.split("-");
      const weekNum = parseInt(yearWeekParts[1]);
      reservaYearWeek = yearWeekParts[0] + "-" + (weekNum - 1).toString();

      if (day === reservaDay && hora === reservaHora && currentYearWeek === reservaYearWeek) {
          return false;
      }

  }

  // Si ninguna de las condiciones anteriores se cumple, se puede reservar
  return true;
}

calculateDate(day: string): string {
  const dayIndex = this.weekDays.indexOf(day); // Lunes es 0, Martes es 1, etc.
  let todayIndex = new Date().getDay() - 1; // getDay() devuelve 0 para Domingo, 1 para Lunes, etc.
  
  // Ajustamos el índice del día actual para que coincida con tu array `weekDays`
  if (todayIndex < 0) {
    todayIndex = 6; // Si es domingo, ajustamos el índice a 6
  }
  
  let daysToAdd = dayIndex - todayIndex + (7 * this.currentWeek);
  
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }
  
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysToAdd);

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1; // Los meses comienzan en 0, por lo que le añadimos 1
  const dayReal = targetDate.getDate();

  return `${year}-${month.toString().padStart(2, '0')}-${dayReal.toString().padStart(2, '0')}`;
 
}





async reserve(day: string, hora: string, pista:Pista) {
  if (!this.canReserve(day, hora, pista)) {
    return;
  }

  const { value: email } = await Swal.fire({
    title: 'Realizar reserva',
    input: 'text',
    inputLabel: 'Tu correo electrónico',
    inputPlaceholder: 'Introduce tu correo electrónico',
    inputAttributes: {
      required: 'true'  // Aquí es donde necesitas cambiar
    },
    showCancelButton: true,
    confirmButtonText: 'Reservar y pagar',
    cancelButtonText: 'Cancelar',
    footer: '<a href="">¿Necesitas ayuda?</a>',
    preConfirm: (email) => {
      if (email) {
          const fecha = this.calculateDate(day);
          console.log(fecha);
          
          const reserva = {
            fecha,
            hora,
            usuario: email,
          };
          console.log(reserva);
          
      
          // Haz algo con 'reserva', como enviarlo a un servidor
        
      }
    }
  })
  

  
}






 




  
  
  
}

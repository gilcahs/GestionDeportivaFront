
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { SportsService } from '../../services/sports.service';
import { Pista, PistasResponse, Reserva } from '../../interfaces/pistas.interface';
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
  const dayNumbers: { [key: string]: number } = {
    'Domingo': 0, // Actualizado para coincidir con Date.getDay()
    'Lunes': 1,
    'Martes': 2,
    'Miercoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sabado': 6,
  };
  
  const currentDate = new Date();
  const targetDate = new Date();
  
  // Calculamos la diferencia entre el día actual y el día objetivo
  const dayDiff = dayNumbers[day as keyof typeof dayNumbers] - currentDate.getDay();

  // Si estamos en la misma semana y el día objetivo es anterior al día actual, no podemos reservar
  if (this.currentWeek === 0 && dayDiff < 0) {
    return false;
  }

  // Establecemos la fecha objetivo agregando la diferencia de días a la fecha actual
  targetDate.setDate(currentDate.getDate() + dayDiff + (7 * this.currentWeek));

  // Ahora que tenemos la fecha objetivo, podemos verificar si la hora ha pasado
  if (this.currentWeek === 0 && dayDiff === 0) {
    const [currentHours, currentMinutes] = [currentDate.getHours(), currentDate.getMinutes()];
    const [horaHours, horaMinutes] = hora.split("-")[0].split(":").map(Number);
      
    if (currentHours > horaHours || (currentHours === horaHours && currentMinutes > horaMinutes)) {
      return false;
    }
  }

  // Ahora revisamos si la pista ya está reservada
  for (const reserva of pista.reservas!) {
    const reservaDate = new Date(reserva.fecha!);
    
    if (reservaDate.toISOString().slice(0,10) === targetDate.toISOString().slice(0,10)) {
      const reservaStartTime = reserva.hora!.split("-")[0];
      const reservaEndTime = reserva.hora!.split("-")[1];
      const targetStartTime = hora.split("-")[0];
      const targetEndTime = hora.split("-")[1];
      
      if ((targetStartTime >= reservaStartTime && targetStartTime < reservaEndTime) || 
          (targetEndTime > reservaStartTime && targetEndTime <= reservaEndTime) || 
          (targetStartTime <= reservaStartTime && targetEndTime >= reservaEndTime)) {
        return false;
      }
    }
  }

  // Si ninguna de las condiciones anteriores se cumple, se puede reservar
  return true;
}


// canReserve(day: string, hora: string, pista: Pista): boolean {
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + (7 * this.currentWeek));
//   const currentDay = this.weekDays[currentDate.getDay() - 1];
//   const currentTime = currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0');
//   const currentYearWeek = this.getYearWeek(currentDate);
//   const dayNumbers: { [key: string]: number } = {
//     'Lunes': 1,
//     'Martes': 2,
//     'Miercoles': 3,
//     'Jueves': 4,
//     'Viernes': 5,
//     'Sabado': 6,
//     'Domingo': 7,
//   };

//   if (this.currentWeek === 0) {   
//     // Comprobar si el día ya pasó
//     if (dayNumbers[day as keyof typeof dayNumbers] < dayNumbers[currentDay as keyof typeof dayNumbers]) {

//       return false;
//     }
  

    
//     // Comprobar si la hora ya pasó
//     if (day === currentDay) {
//       const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
//       const [horaHours, horaMinutes] = hora.split("-")[0].split(":").map(Number);
      
//       if (currentHours > horaHours || (currentHours === horaHours && currentMinutes > horaMinutes)) {


//         return false;
//       }
//     }
//   }



//   const targetDay = this.calculateDate(day);
//   for (const reserva of pista.reservas!) {
//     const reservaDate = new Date(reserva.fecha!);
//     const reservaDay = this.calculateDate(this.weekDays[reservaDate.getUTCDay() - 1]);
  
//     // Comprueba si la fecha de la reserva es igual a la fecha del día que quieres reservar
//     if (targetDay === reservaDay) {
//       const reservaStartTime = reserva.hora!.split("-")[0];
//       const reservaEndTime = reserva.hora!.split("-")[1];
//       const targetStartTime = hora.split("-")[0];
//       const targetEndTime = hora.split("-")[1];
  
//       // Comprueba si el intervalo de tiempo que quieres reservar se superpone con el intervalo de tiempo de alguna reserva existente
//       if ((targetStartTime >= reservaStartTime && targetStartTime < reservaEndTime) || 
//           (targetEndTime > reservaStartTime && targetEndTime <= reservaEndTime) || 
//           (targetStartTime <= reservaStartTime && targetEndTime >= reservaEndTime)) {
//         return false;
//       }
//     }
//   }
  

//   // Si ninguna de las condiciones anteriores se cumple, se puede reservar
//   return true;
// }

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

  Swal.fire({
    title: 'Realizar reserva',
    input: 'email',
    inputPlaceholder: 'Introduce tu correo electrónico',
    inputValidator: (value) => {
      // Verificación básica de correo electrónico
      const regex = /\S+@\S+\.\S+/;
      if (!regex.test(value)) {
        return 'Por favor ingresa un correo electrónico válido';
      }
      return '';
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
    
        return this.sportsService.hacerReserva(reserva, pista.uid!)
          .toPromise()
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            Swal.showValidationMessage(`La reserva falló: ${error}`);
          });
      } else {
        return Promise.reject(new Error('Correo electrónico no proporcionado'));
      }
    },
    
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Reserva realizada con éxito', '', 'success')
    }
  });
  
  
  
}
async hacerReserva(reserva:any, pistaId:string){
  return this.sportsService.hacerReserva(reserva, pistaId)
}

async pay() {
  console.log("Haciendo pagos");
  // const stripe = await this.stripePromise;
  // const { error, paymentMethod } = await stripe.createPaymentMethod({
  //   type: 'card',
  //   card: this.cardElement,
  // });

  // if (error) {
  //   console.log(error);
  // } else {
  //   // Send the paymentMethod.id to your server
  // }
}
}

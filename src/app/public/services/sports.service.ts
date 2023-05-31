import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deporte, Deportes } from '../interfaces/deporte.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HorariosDisponibles, Pista, PistasResponse, Reserva } from '../interfaces/pistas.interface';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  private baseUrl: string = environment.baseUrl

  private _deporteSeleccionado?: Deporte;
  private _deportes!: Deportes

  private _pistas?: PistasResponse

  private _lastReserva?: Reserva

  private _pistaSeleccionada?: Pista

  get pistaSeleccionada(){
    return { ...this._pistaSeleccionada }
  }

  get pistas(){
    return { ...this._pistas }
  }

  get deporteSeleccionado() {
    return { ...this._deporteSeleccionado }
  }
  get deportes() {
    return { ...this._deportes }
  }

  get lastReserva(){
    return { ...this._lastReserva}
  }


  constructor(private http: HttpClient) { }

  getDeportes(){
    const url = `${ this.baseUrl }/deportes`
    return this.http.get<Deportes>(url)
      .pipe(
        tap(resp => {
         if (resp != null) {
          this._deportes = {
            deportes: resp.deportes
          }
         }


        }),
        map( resp => this.deportes),
        catchError(err => of(err.error.msg))
      )
  }

  getPistasByDeporte(deporteId: String){
    const url = `${ this.baseUrl }/pistas/deportes/reservas/${deporteId}`
    console.log(url);

    return this.http.get<PistasResponse>(url)
      .pipe(
        tap(resp => {
          console.log(resp);

          if(resp != null){
            this._pistas = resp
          }
        }),
        map( resp => this.pistas),
        catchError(err => of(err.error.msg))
      )
  }

  hacerReserva(reserva: any, pistaId : string){
    const url = `${this.baseUrl}/pistas/${pistaId}/reserva/`
    const body = reserva
    return this.http.post<Reserva>(url, body)
      .pipe(
        tap(resp => {
          console.log(resp);
          
         if (resp != null) {
          resp = this.lastReserva

          console.log(this.lastReserva);
          
         }
          
        }),
        map( resp => true),
        catchError(err => of(err.error.msg))
      )
  }

  horariosPut(pistaId : string, horarios: HorariosDisponibles) {
    const url = `${this.baseUrl}/pistas/${pistaId}/horarios/`

    const body = {horarios}
    // Implementar la lógica para actualizar los horarios aquí
    // Esta es una solicitud PUT de ejemplo
    return this.http.put<Pista>(url, body)
      .pipe(
        tap(resp => {
          console.log(resp);
          
         if (resp != null) {
          this._pistaSeleccionada = resp
          
         }
      
        }),
        map( (resp) => true),
        catchError(err => of(err.error.msg))
      )
  }

  borrarReservas(reservas: Reserva[]) {
    // Implementar la lógica para borrar las reservas aquí
    // Esta es una solicitud DELETE de ejemplo
    const url = '/api/cositas'; // Aquí deberías usar la URL correcta de tu API
    return this.http.delete(url);
  }
  borrarPista(pistaId : string) {
    // Implementar la lógica para borrar las reservas aquí
    // Esta es una solicitud DELETE de ejemplo
    const url = '/api/cositas'; // Aquí deberías usar la URL correcta de tu API
    return this.http.delete(url);
  }

  
  selectPista(pista:Pista){
    this._pistaSeleccionada = pista
  }
}

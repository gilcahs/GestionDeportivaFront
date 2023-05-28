import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deporte, Deportes } from '../interfaces/deporte.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PistasResponse, Reserva } from '../interfaces/pistas.interface';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  private baseUrl: string = environment.baseUrl

  private _deporteSeleccionado?: Deporte;
  private _deportes!: Deportes

  private _pistas?: PistasResponse

  private _lastReserva?: Reserva

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
}

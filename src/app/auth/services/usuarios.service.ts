import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrl
   private usuarios!: Usuario[]

   constructor( private http: HttpClient) { }
   getUsuarios(){
    const url = `${ this.baseUrl }/usuarios`
    return this.http.get<Usuario[]>(url)
      .pipe(
        tap(resp => {
         if (resp != null) {
          this.usuarios = resp
         }


        }),
        map( resp => this.usuarios),
        catchError(err => of(err.error.msg))
      )
  }

  deleteUsuario(userId: string){
    const url = `${ this.baseUrl }/usuarios/${userId}`;

    // obtén el token del local storage
    const token = localStorage.getItem('x-token');

    // define las opciones HTTP, incluyendo los headers
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token!
      })
    };

    // realiza la petición HTTP con las opciones definidas
    return this.http.delete(url, httpOptions)
      .pipe(
        tap(resp => {
         if (resp != null) {
          console.log(resp);
         }
        }),
        map( resp => true),
        catchError(err => of(err.error.msg))
      );
}
}

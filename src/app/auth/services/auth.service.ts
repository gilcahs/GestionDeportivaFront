import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl

  private _usuario?: Usuario;

  get usuario() {
    return { ...this._usuario }
  }

  constructor( private http: HttpClient) { }

  login( correo: string, password: string) {

    const url = `${ this.baseUrl }/auth/login`
    const body = { correo, password}
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
         if (resp != null) {
          localStorage.setItem('x-token', resp.token!)
          this._usuario = {
            nombre: resp.usuario.nombre,
            rol: resp.usuario.rol,
            uid: resp.usuario.uid
          }
         }

        }),
        map( resp => true),
        catchError(err => of(err.error.msg))
      )
  }

  registro( nombre:string, correo:string, password:string, rol:string ){

    const url = ` ${this.baseUrl}/usuarios`
    const body = {nombre, correo, password, rol}

    return this.http.post<Usuario>(url, body)
      .pipe(
        tap( resp => {
          console.log(resp);
        }),
        map( resp => true),
        catchError(err => {
          console.log(err);
          console.log(err.error.errors[0].msg);

          return of(err.error.errors[0].msg)})
      )

  }

  validarToken(): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/renew`

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('x-token') || '')
    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map( resp => {
          console.log(resp.token);

          localStorage.setItem('x-token', resp.token!)
          this._usuario = {
            nombre: resp.usuario.nombre,
            uid: resp.usuario.uid,
            rol: resp.usuario.rol

          }
          return resp != null
        }),
        catchError( err => of(false) )
      )

  }
  isAdmin(): Boolean{
    return this._usuario?.rol == 'ADMIN_ROLE'
  }

  logout() {
    localStorage.removeItem('x-token');
    this._usuario = undefined
  }
}

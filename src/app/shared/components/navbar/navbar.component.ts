import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario?: Usuario
  validate:Boolean = false
  isAdmin: Boolean = false
  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {

    this.authService.validarToken().subscribe( resp => this.validate =  resp)
    this.usuario = this.authService.usuario
    this.isAdmin = this.authService.isAdmin()
  }


  logOut() {
    this.authService.logout();
    this.usuario = undefined
    this.validate = false
    this.router.navigateByUrl('/SportCenter');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sesión cerrada con éxito',
      showConfirmButton: false,
      timer: 3000 // Este es el tiempo que la notificación estará visible, en milisegundos
    });
  }


}

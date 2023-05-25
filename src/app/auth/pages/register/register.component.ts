import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formularioRegistro: FormGroup = this.fb.group({
    nombre: ['test20', [Validators.required, Validators.minLength(4)]],
    correo: ['test20@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    rol: ['VENTAS_ROLE', [Validators.required]],
  })

  constructor( private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {}
  registro() {

    const { nombre, correo, password, rol } = this.formularioRegistro.value
    this.authService.registro( nombre, correo, password, rol )
      .subscribe(  resp => {
        console.log(resp);
        

        if (resp === true) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El usuario ha sido guardado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.formularioRegistro.reset()
        }else {
          Swal.fire('Error', resp, 'error')
        }

      })

    
  }

}

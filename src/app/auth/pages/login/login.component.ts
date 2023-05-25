import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup = this.fb.group({
    correo: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  constructor( private fb: FormBuilder,
                private router: Router,
                private authService: AuthService ) {}

  login() {

    
    console.log(this.formularioLogin.value);
    const { correo, password } = this.formularioLogin.value;
    this.authService.login(correo, password)
      .subscribe( resp => {
        console.log(resp);
        
        if (resp === true) {
          this.router.navigateByUrl('/dashboard')
        }else {
          Swal.fire('Error', resp, 'error')
        }
        
      })
    
    
    
  }
}

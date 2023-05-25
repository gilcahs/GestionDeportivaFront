import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-edit-pista',
  templateUrl: './edit-pista.component.html',
  styleUrls: ['./edit-pista.component.css']
})
export class EditPistaComponent {

  get usuario(){
    return this.authService.usuario
  }
  constructor( private router: Router,
                private authService: AuthService){}

  logout() {
    this.router.navigateByUrl('/auth')
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'acciones'];
  filter = {
    nombre: '',
    correo: '',
  };
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];

  constructor(private usuarioService: UsuariosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(resp => {
      this.usuarios = resp

    })
  }





  editUser(uid: string): void {
    // Aquí va tu código para editar al usuario
    console.log('Editar al usuario con uid:', uid);
  }

  deleteUser(uid: string): void {
    // Aquí va tu código para borrar al usuario
    console.log('Borrar al usuario con uid:', uid);
    this.usuarioService.deleteUsuario(uid).subscribe( resp => {

      if (resp === true) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El usuario ha sido eliminado con exito',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Recargar la página después de que se cierre el alerta
          location.reload();
        })

      }else {
        Swal.fire('Error', resp, 'error')
      }
    }

    )
  }

  addUser() {
    Swal.fire({
      title: 'Añadir usuario',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nombre">
        <input id="swal-input2" class="swal2-input" placeholder="Correo">
        <input id="swal-input3" class="swal2-input" placeholder="Contraseña" type="password">
        <select id="swal-input4" class="swal2-input">
          <option value="VENTAS_ROLE">VENTAS_ROLE</option>
          <option value="ADMIN_ROLE">ADMIN_ROLE</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        let nombre = (document.getElementById('swal-input1') as HTMLInputElement).value;
        let correo = (document.getElementById('swal-input2') as HTMLInputElement).value;
        let password = (document.getElementById('swal-input3') as HTMLInputElement).value;
        let role = (document.getElementById('swal-input4') as HTMLSelectElement).value;

        // Verifica la longitud del nombre
        if (nombre.length < 4) {
          Swal.showValidationMessage('El nombre debe tener al menos 4 caracteres');
          return;
        }

        // Verifica si el correo es válido
        let re = /\S+@\S+\.\S+/;
        if (!re.test(correo)) {
          Swal.showValidationMessage('Por favor, introduce un correo válido');
          return;
        }

        // Verifica la longitud de la contraseña
        if (password.length < 6) {
          Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres');
          return;
        }

        // Si todas las verificaciones son correctas, devolvemos los datos
        return {
          nombre: nombre,
          correo: correo,
          password: password,
          role: role
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes añadir el código para añadir el usuario con la información obtenida
        console.log(result.value);

        this.registro(result.value?.nombre!, result.value?.correo!, result.value?.password!, result.value?.role!)
      }
    });
  }


  registro(nombre: string, correo: string, password: string, rol: string) {


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
          }).then(() => {
            // Recargar la página después de que se cierre el alerta
            location.reload();
          })

        }else {
          Swal.fire('Error', resp, 'error')
        }

      })


  }

}

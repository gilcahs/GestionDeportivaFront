import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Deportes } from 'src/app/public/interfaces/deporte.interface';
import { Pista, PistasResponse, Reserva } from 'src/app/public/interfaces/pistas.interface';
import { SportsService } from 'src/app/public/services/sports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-deportes',
  templateUrl: './gestion-deportes.component.html',
  styleUrls: ['./gestion-deportes.component.css']
})
export class GestionDeportesComponent {

  displayedColumns: string[] = ['nombre', 'icono', 'acciones'];
  deportes? : Deportes;

  constructor(private sportsService: SportsService, private router: Router) { }

  ngOnInit(): void {
    this.sportsService.getDeportes().subscribe( resp  => {
      console.log(resp);

      this.deportes = resp
    }

    );
    console.log(this.deportes);
  }

  

  deleteDeporte(id: string): void {
    this.sportsService.getPistasByDeporte(id).subscribe((response) => {
      const pistas : Pista[] = response.pistas;
      console.log(pistas);
      
      let reservasFuturas: Reserva[] = [];
  
      pistas?.forEach((pista) => {
        console.log(pista);
        
        const reservas = pista.reservas;
        reservas?.forEach((reserva) => {
          if (new Date(reserva.fecha!) > new Date()) {
            reservasFuturas.push(reserva);
          }
        });
      });
  
      if (reservasFuturas.length > 0) {
        Swal.fire({
          title: 'Advertencia',
          text: 'Hay reservas futuras para este deporte. Al eliminar el deporte, estas reservas serán canceladas y se notificará a los usuarios.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.sportsService.borrarReservas(reservasFuturas).subscribe((response) => {
              if (response === true) {
                this.sportsService.deleteDeporte(id).subscribe((resp) => {
                  if(resp === true){
              
                    Swal.fire('Deporte eliminado', '', 'success');
                    this.router.navigateByUrl('/protected/gestionDeportes')
    
                  }else {
                    Swal.fire('Error', resp, 'error')
                  }
                });
              } else {
                Swal.fire('Error', 'No se pudieron cancelar las reservas', 'error');
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Advertencia',
          text: 'Al eliminar este deporte, todas sus pistas serán eliminadas.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.sportsService.deleteDeporte(id).subscribe((resp) => {
              if(resp === true){
              
                Swal.fire('Deporte eliminado', '', 'success');
                this.router.navigateByUrl('/protected/gestionDeportes')

              }else {
                Swal.fire('Error', resp, 'error')
              }
              
            });
          }
        });
      }
    });
  }

  editDeporte(deporte: any): void {
    Swal.fire({
        title: 'Edit Deporte',
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nombre del deporte" value="${deporte.nombre}">
            <input id="swal-input2" class="swal2-input" placeholder="Icono" value="${deporte.icono}">
            <img id="swal-img" src="" style="max-width: 10%; margin-top: 10px;">
        `,
        focusConfirm: false,
        didOpen: () => {
          document.getElementById('swal-input2')?.addEventListener('input', (e) => {
            const url = (e.target as HTMLInputElement).value;
            (document.getElementById('swal-img') as HTMLImageElement).src = url;
          });
        },
        preConfirm: () => {
            let nombre = (<HTMLInputElement>document.getElementById('swal-input1')).value;
            let icono = (<HTMLInputElement>document.getElementById('swal-input2')).value;

            // Aquí puedes agregar tus propias reglas de validación
            if (nombre.length < 3) {
                Swal.showValidationMessage('El nombre del deporte debe tener al menos 3 caracteres');
            }

            // Aquí puedes agregar la lógica para validar y cargar el icono

            return {nombre: nombre, icono: icono};
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            // Aquí puedes hacer lo que necesites con los valores ingresados
           

            // Comprobar si los valores han cambiado
            let changes: any = {};

            if (deporte.nombre !== result.value.nombre) {
                changes.nombre = result.value.nombre;
            }
            if (deporte.icono !== result.value.icono) {
                changes.icono = result.value.icono;
            }

            console.log(changes);
            

            if (Object.keys(changes).length > 0) {
                // Si hay cambios, llamar al método del servicio
                this.sportsService.patchDeporte(deporte._id, changes).subscribe(response => {
                    console.log(response);
                    if (response == true) {
                      Swal.fire('Creada!', 'El deporte ha sido actualizado correctamente.', 'success');
                      this.router.navigateByUrl('/protected/gestionDeportes')
                    }else{
                      Swal.fire('Error', response, 'error')
                    }
                    // Aquí puedes actualizar la lista de deportes o hacer algo más
                });
            }
        }
    });
}




  addDeporte(): void {
    Swal.fire({
      title: 'Añadir deporte',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Icono">',
      focusConfirm: false,

      preConfirm: () => {
        let input1 = document.getElementById('swal-input1') as HTMLInputElement;
        let input2 = document.getElementById('swal-input2') as HTMLInputElement;
        return [
          input1.value,
          input2.value
        ]
      }
    }).then((result) => {
      // Aquí puedes obtener los valores del modal y enviarlos a tu backend para crear un nuevo deporte
      console.log(result.value);
      this.sportsService.addDeporte(result).subscribe( resp => {
        if (resp === true){
          window.location.reload()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Los cambios se han guardado',
            showConfirmButton: false,
            timer: 1500
          })
        
        }else {
          Swal.fire('Error', resp, 'error')
        }
      })
    });
    
  }

  async openAddSportDialog() {
    const { value: formValues } = await Swal.fire({
      title: 'Añadir Deporte',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="URL de Icono">' +
        '<img id="swal-img" src="" style="max-width: 10%; margin-top: 10px;">',
      focusConfirm: false,
      didOpen: () => {
        document.getElementById('swal-input2')?.addEventListener('input', (e) => {
          const url = (e.target as HTMLInputElement).value;
          (document.getElementById('swal-img') as HTMLImageElement).src = url;
        });
      },
      preConfirm: () => {
        let nombre = (document.getElementById('swal-input1') as HTMLInputElement).value;
        let icono = (document.getElementById('swal-input2') as HTMLInputElement).value;

        if (nombre.length < 3) {
          Swal.showValidationMessage('El nombre debe tener al menos 3 caracteres');
          return null;
        } else if (icono && !this.validateUrl(icono)) {
          Swal.showValidationMessage('El icono debe ser una URL válida de una imagen');
          return null;
        } else {
          return { nombre: nombre, icono: icono };
        }
      }
    });

    if (formValues) {
      console.log(formValues);
      
      this.sportsService.addDeporte(formValues).subscribe(resp => {
        if (resp === true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La pista se ha guardado',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
        }else{
          Swal.fire('Error', resp, 'error')
        }
      });
    }
  }

  validateUrl(url: string) {
    let urlPattern = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
    return urlPattern.test(url);
  }



}

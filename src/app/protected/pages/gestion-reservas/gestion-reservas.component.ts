
import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/public/interfaces/pistas.interface';

import { SportsService } from 'src/app/public/services/sports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['./gestion-reservas.component.css']
})
export class GestionReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  allReservas: Reserva[] = [];
  
  displayedColumns: string[] = ['fecha', 'hora', 'usuario', 'pista', 'cancelada', 'acciones'];
  filter: any = {};

  constructor(private sportsService: SportsService) { }
  ngOnInit() {
    this.sportsService.getReservas().subscribe( resp  => {
      console.log(resp);

      this.reservas = resp
      this.allReservas = resp
    }

    );
    console.log(this.reservas);
  }
  applyFilter(): void {
    this.reservas = this.allReservas.filter(reserva =>
      (!this.filter.fecha || reserva.fecha!.toString().includes(this.filter.fecha)) &&
      (!this.filter.hora || reserva.hora!.includes(this.filter.hora)) &&
      (!this.filter.usuario || reserva.usuario!.includes(this.filter.usuario)) &&
      (!this.filter.pista || reserva.pista!.includes(this.filter.pista))
    );
  }

  deleteReserva(reserva: Reserva) {
    let text = 'Se procederá a eliminar la reserva';
    if (!reserva.cancelada && new Date(reserva.fecha!) > new Date()) {
      text += ', y se notificará al usuario de la cancelación de su reserva';
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sportsService.deleteReserva(reserva._id!).subscribe(resp => {
          console.log(resp); 
          
          if (resp) {
            Swal.fire({
              title: 'Eliminada',
              text: 'La reserva ha sido eliminada con éxito',
              icon: 'success',
            }).then((result) => {
              // Recargar la página
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al eliminar la reserva',
              icon: 'error',
            });
          }
        });
      }
    });
  }


}

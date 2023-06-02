import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Deporte, Deportes } from 'src/app/public/interfaces/deporte.interface';
import { SportsService } from 'src/app/public/services/sports.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-pista',
  templateUrl: './add-pista.component.html',
  styleUrls: ['./add-pista.component.css']
})
export class AddPistaComponent implements OnInit{
  pistaForm: FormGroup;
  deportes?: Deportes;
  dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  constructor(private fb: FormBuilder, private sportService: SportsService, private router: Router) {
    this.pistaForm = this.fb.group({
      nombre: [''],
      deporte: [''],
      horariosDisponibles: this.fb.array([])
    });

    for (let dia of this.dias) {
      this.horariosDisponibles.push(this.fb.group({
        dia: [dia],
        horarios: this.fb.array([])
      }));
    }

    this.sportService.getDeportes().subscribe(deportes => {
      this.deportes = deportes;
    });
  }

  ngOnInit(): void {
    this.sportService.getDeportes().subscribe( resp  => {
      console.log(resp);

      this.deportes = resp
    }

    );
    console.log(this.deportes);
  }

  get horariosDisponibles(): FormArray {
    return this.pistaForm.get('horariosDisponibles') as FormArray;
  }

  getHorarios(dia: string): FormArray {
    return this.horariosDisponibles.controls[this.dias.indexOf(dia)].get('horarios') as FormArray;
  }

  addHorario(dia: string): void {
    this.getHorarios(dia).push(this.fb.group({
      inicio: [''],
      fin: ['']
    }, { validator: this.timeRangeValidator }));
  }

  deleteHorario(dia: string, index: number): void {
    this.getHorarios(dia).removeAt(index);
  }

  

  onSubmit(): void {
    const pista: {
      nombre: string,
      deporte: string,
      horariosDisponibles: Record<string, string[]>
    } = {
      nombre: this.pistaForm.get('nombre')!.value,
      deporte: this.pistaForm.get('deporte')!.value != "" ? this.pistaForm.get('deporte')!.value : this.deportes!.deportes![0]!._id,
      horariosDisponibles: {}
    };

    
  
    for (let dia of this.dias) {
      const horarios = this.getHorarios(dia).controls.map(control => {
        return {
          inicio: control.get('inicio')?.value,
          fin: control.get('fin')?.value
        };
      });
  
      for (let i = 0; i < horarios.length; i++) {
        if (horarios[i].inicio >= horarios[i].fin) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `El horario de inicio debe ser menor que el horario de fin para el día ${dia}, horario ${i + 1}`
          });
          return;
        }
  
        for (let j = i + 1; j < horarios.length; j++) {
          if (horarios[i].inicio < horarios[j].fin && horarios[j].inicio < horarios[i].fin) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Los horarios se solapan para el día ${dia}, horarios ${i + 1} y ${j + 1}`
            });
            return;
          }
        }
  
        pista.horariosDisponibles[dia] = horarios.map(horario => {
          return `${horario.inicio}-${horario.fin}`;
        });
      }
    }

    this.sportService.postPista(pista)
      .subscribe( resp => {
        if (resp === true) {
          Swal.fire('Creada!', 'La pista ha sido creada correctamente.', 'success');
          this.router.navigateByUrl('/SportCenter')
        }else {
          Swal.fire('Error', resp, 'error')
        }
      })

  
    console.log(pista);
  }
  
  timeRangeValidator(g: FormGroup) {
    return g.get('inicio')?.value < g.get('fin')?.value
      ? null : { 'range': true };
  }

  overlappingTimesValidator(fa: FormArray) {
    const times = fa.controls.map(control => {
      return {
        inicio: control.get('inicio')?.value,
        fin: control.get('fin')?.value
      };
    });
  
    for (let i = 0; i < times.length; i++) {
      for (let j = i + 1; j < times.length; j++) {
        if (times[i].inicio < times[j].fin && times[j].inicio < times[i].fin) {
          return { 'overlapping': true };
        }
      }
    }
  
    return null;
  }
  
  

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SportsService } from 'src/app/public/services/sports.service';


@Component({
  selector: 'app-add-pista',
  templateUrl: './add-pista.component.html',
  styleUrls: ['./add-pista.component.css']
})
export class AddPistaComponent implements OnInit{
  pistaForm: FormGroup;
  deportes?: any[];
  dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  constructor(private fb: FormBuilder, private sportService: SportsService) {
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

  ngOnInit(): void {}

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
    }));
  }

  deleteHorario(dia: string, index: number): void {
    this.getHorarios(dia).removeAt(index);
  }

  onSubmit(): void {
    const pista = {
      nombre: this.pistaForm.get('nombre')?.value,
      deporte: this.pistaForm.get('deporte')?.value,
      horariosDisponibles: {}
    };
  
    for (let dia of this.dias) {
      pista.horariosDisponibles[dia] = this.getHorarios(dia).controls.map(control => {
        return `${control.get('inicio')?.value}-${control.get('fin')?.value}`;
      });
    }
  
    this.sportService.createPista(pista).subscribe(() => {
      // show success message or navigate to another page
    });
  }
  

}

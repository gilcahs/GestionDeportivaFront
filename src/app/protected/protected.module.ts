import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { EditPistaComponent } from './pages/edit-pista/edit-pista.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { AddPistaComponent } from './pages/add-pista/add-pista.component';



@NgModule({
  declarations: [
    EditPistaComponent,
    MainComponent,
    AddPistaComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }

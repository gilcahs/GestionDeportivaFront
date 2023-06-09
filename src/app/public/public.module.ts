import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SportsComponent } from './pages/sports/sports.component';
import { PistasByDeporteComponent } from './pages/pistas-by-deporte/pistas-by-deporte.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { InstalacionesComponent } from './pages/instalaciones/instalaciones.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EventosComponent } from './pages/eventos/eventos.component';





@NgModule({
  declarations: [
    DashboardComponent,
    SportsComponent,
    PistasByDeporteComponent,
    MainComponent,
    InstalacionesComponent,
    EventosComponent,
    

  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class PublicModule { }

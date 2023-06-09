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



@NgModule({
  declarations: [
    DashboardComponent,
    SportsComponent,
    PistasByDeporteComponent,
    MainComponent,
    InstalacionesComponent,

  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PublicModule { }

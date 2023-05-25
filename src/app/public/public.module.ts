import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SportsComponent } from './pages/sports/sports.component';
import { PistasByDeporteComponent } from './pages/pistas-by-deporte/pistas-by-deporte.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SportsComponent,
    PistasByDeporteComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SportsComponent } from './pages/sports/sports.component';
import { PistasByDeporteComponent } from './pages/pistas-by-deporte/pistas-by-deporte.component';
import { MainComponent } from './pages/main/main.component';
import { InstalacionesComponent } from './pages/instalaciones/instalaciones.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { AboutUSComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'deportes', component: SportsComponent},
      {path: 'instalaciones', component: InstalacionesComponent},
      {path: 'eventos', component: EventosComponent},
      {path: 'pistas/:_id', component: PistasByDeporteComponent },
      {path: 'aboutUs', component: AboutUSComponent },
      {path: '**', redirectTo: ''}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

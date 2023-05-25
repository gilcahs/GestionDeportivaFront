import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SportsComponent } from './pages/sports/sports.component';
import { PistasByDeporteComponent } from './pages/pistas-by-deporte/pistas-by-deporte.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: 'deportes', component: SportsComponent},
      { path: 'pistas/:_id', component: PistasByDeporteComponent },
      {path: '**', redirectTo: ''}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

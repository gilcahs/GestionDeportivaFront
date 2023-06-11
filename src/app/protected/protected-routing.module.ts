import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPistaComponent } from './pages/edit-pista/edit-pista.component';
import { MainComponent } from './pages/main/main.component';
import { AddPistaComponent } from './pages/add-pista/add-pista.component';
import { GestionDeportesComponent } from './pages/gestion-deportes/gestion-deportes.component';
import { GestionReservasComponent } from './pages/gestion-reservas/gestion-reservas.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'editpista/:uid', component: EditPistaComponent},
      {path: 'addPista', component: AddPistaComponent},
      {path: 'gestionDeportes', component: GestionDeportesComponent},
      {path: 'gestionReservas', component: GestionReservasComponent},
      {path: 'gestionUsuarios', component: GestionUsuariosComponent},
      {path: '**', redirectTo: ''}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }

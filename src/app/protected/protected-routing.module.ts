import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPistaComponent } from './pages/edit-pista/edit-pista.component';
import { MainComponent } from './pages/main/main.component';
import { AddPistaComponent } from './pages/add-pista/add-pista.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'editpista/:uid', component: EditPistaComponent},
      {path: 'addPista', component: AddPistaComponent},
      {path: '**', redirectTo: ''}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }

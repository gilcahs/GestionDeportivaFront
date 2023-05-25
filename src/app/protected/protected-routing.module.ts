import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPistaComponent } from './edit-pista/edit-pista.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: '', component: EditPistaComponent},
      {path: '**', redirectTo: ''}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }

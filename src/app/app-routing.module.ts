import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'SportCenter',
    loadChildren: () => import('./public/public.module').then(  m => m.PublicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(  m => m.AuthModule)
  },
  {
    path: 'protected',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path:'**',
    redirectTo: 'SportCenter'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

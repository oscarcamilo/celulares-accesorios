import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RegistarseComponent } from './registarse/registarse.component';

const routes: Routes = [
  {
    path: 'identificar',
    component: IdentificacionComponent
  },
  {
    path: 'registro',
    component: RegistarseComponent
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }

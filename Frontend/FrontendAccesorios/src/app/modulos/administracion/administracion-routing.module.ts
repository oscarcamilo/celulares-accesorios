import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarSesionGuard } from 'src/app/guardianes/validar-sesion.guard';
import { BuscarPersonaComponent } from './persona/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './persona/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './persona/eliminar-persona/eliminar-persona.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { ComparComponent } from '../pedidos/compar/compar.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';


const routes: Routes = [
  {
    path: 'crear-persona',
    component:CrearPersonaComponent
  },
  {
    path: 'editar-persona/:id',
    component: EditarPersonaComponent,
    canActivate : [ValidarSesionGuard]
  },
  {

    path: 'eliminar-persona/:id',
    component: EliminarPersonaComponent,
    canActivate : [ValidarSesionGuard]
  },
  {
    path: 'listar-persona',
    component:BuscarPersonaComponent,
    canActivate : [ValidarSesionGuard]
  },
  {

    path: "listar-productos",
    component: BuscarProductoComponent,
    canActivate : [ValidarSesionGuard]
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
    canActivate : [ValidarSesionGuard]
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoComponent,
    canActivate : [ValidarSesionGuard]
  },
  {
    path: 'eliminar-producto/:id',
    component: EliminarProductoComponent,
    canActivate : [ValidarSesionGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

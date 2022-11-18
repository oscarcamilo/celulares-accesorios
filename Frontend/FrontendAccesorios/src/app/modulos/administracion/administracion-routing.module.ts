import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPersonaComponent } from './persona/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './persona/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';
<<<<<<< HEAD
import { EliminarPersonaComponent } from './persona/eliminar-persona/eliminar-persona.component';
=======
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
>>>>>>> 10496ae41950b9bb44d9f3bd67a37fcda5476542

const routes: Routes = [
  {
    path: 'crear-persona',
    component:CrearPersonaComponent
  },
  {
    path: 'editar-persona/:id',
    component: EditarPersonaComponent
  },
  {
<<<<<<< HEAD
    path: 'eliminar-persona/:id',
    component: EliminarPersonaComponent
  },
  {
    path: 'listar-persona',
    component:BuscarPersonaComponent
=======
    path: "listar-productos",
    component: BuscarProductoComponent
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoComponent
  },
  {
    path: 'eliminar-producto',
    component: EliminarProductoComponent
>>>>>>> 10496ae41950b9bb44d9f3bd67a37fcda5476542
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPersonaComponent } from './persona/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component:CrearPersonaComponent
  },
  {
    path: 'editar-persona',
    component: EditarPersonaComponent
  },
  {
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
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

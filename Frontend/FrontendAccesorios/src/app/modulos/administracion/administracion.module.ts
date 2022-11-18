import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearPersonaComponent } from './persona/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';
import { BuscarPersonaComponent } from './persona/buscar-persona/buscar-persona.component';
import { EliminarPersonaComponent } from './persona/eliminar-persona/eliminar-persona.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrearPersonaComponent,
    EditarPersonaComponent,
    BuscarPersonaComponent,
    EliminarPersonaComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    BuscarProductoComponent,
    EliminarProductoComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministracionModule { }

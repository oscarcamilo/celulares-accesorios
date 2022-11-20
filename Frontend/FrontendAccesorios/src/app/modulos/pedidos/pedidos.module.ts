import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { AsignarPedidoComponent } from './asignar-pedido/asignar-pedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EliminarPedidoComponent } from './eliminar-pedido/eliminar-pedido.component';


@NgModule({
  declarations: [
    AsignarPedidoComponent,
    EliminarPedidoComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PedidosModule { }

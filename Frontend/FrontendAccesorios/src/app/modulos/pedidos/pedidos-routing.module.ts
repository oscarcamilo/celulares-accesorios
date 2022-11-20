import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarSesionGuard } from 'src/app/guardianes/validar-sesion.guard';
import { AsignarPedidoComponent } from './asignar-pedido/asignar-pedido.component';
import { ComparComponent } from './compar/compar.component';
import { EditarPedidoComponent } from './editar-pedido/editar-pedido.component';
import { EliminarPedidoComponent } from './eliminar-pedido/eliminar-pedido.component';

const routes: Routes = [
  {
    path: 'relizar-compra',
    component: ComparComponent,
    canActivate: [ValidarSesionGuard]
  },
  {
    path : 'editar-pedido/:id',
    component : EditarPedidoComponent,
    canActivate: [ValidarSesionGuard]
  },
  {
    path : 'eliminar-pedido/:id',
    component : EliminarPedidoComponent,
    canActivate : [ValidarSesionGuard]
  },
  {
    path : 'listar-pedidos',
    component : AsignarPedidoComponent,
    canActivate : [ValidarSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }

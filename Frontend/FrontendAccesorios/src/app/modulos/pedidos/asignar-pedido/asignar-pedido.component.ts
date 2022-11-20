import { Component, OnInit } from '@angular/core';
import { ModeloPedidos } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-asignar-pedido',
  templateUrl: './asignar-pedido.component.html',
  styleUrls: ['./asignar-pedido.component.css']
})
export class AsignarPedidoComponent implements OnInit {

  listarPedidos : ModeloPedidos[] = [];


  constructor(private serviciosPedidos: PedidoService) { }

  ngOnInit(): void {
    this.ObtenerPedidos();
  }

  ObtenerPedidos(){
    this.serviciosPedidos.ObtenerPedidos().subscribe((datos: ModeloPedidos[]) => {
      this.listarPedidos = datos;
    })
  }

}

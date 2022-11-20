import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPedidos } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {
  id:string = '';

  fgValidador: FormGroup = this.fg.group({
    'id': ['', [Validators.required]],
    'id_producto': ['', [Validators.required]],
    'personaId': ['', [Validators.required]],
    'Precio': ['', [Validators.required]],
    'cantidad': ['', [Validators.required]],
    'tipoEntrega': ['', [Validators.required]],
    'total': ['', [Validators.required]]
  });
  constructor(private fg : FormBuilder,
    private serviciosPedido : PedidoService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarPedido();
  }

  BuscarPedido(){
    this.serviciosPedido.ObtenerPedidoPorId(this.id).subscribe((datos: ModeloPedidos) => {
      this.fgValidador.controls["id_producto"].setValue(datos.id_producto);
      this.fgValidador.controls["personaId"].setValue(datos.personaId);
      this.fgValidador.controls["cantidad"].setValue(datos.cantidad);
      this.fgValidador.controls["total"].setValue(datos.total);
      this.fgValidador.controls["tipoEntrega"].setValue(datos.tipoEntrega);
    });
  }
  EditarPedido(){
    let pedido = new ModeloPedidos();
    pedido.id_producto = this.fgValidador.controls['id_producto'].value;
    pedido.personaId = this.fgValidador.controls['personaId'].value;
    pedido.cantidad = parseInt(this.fgValidador.controls["cantidad"].value);
    pedido.total = parseInt(this.fgValidador.controls['total'].value);
    pedido.tipoEntrega = this.fgValidador.controls['tipoEntrega'].value;
    this.serviciosPedido.ActualizarPedido(pedido).subscribe((datos: ModeloPedidos) => {
      alert('Datos Actualizados Correctamente')
      this.router.navigate(['/pedidos/listar-pedidos']);
    }, (error : any) => {
      alert('Error Al Actualizar los Datos')
    });
  }

}

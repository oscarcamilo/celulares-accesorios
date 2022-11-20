import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPedidos } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-eliminar-pedido',
  templateUrl: './eliminar-pedido.component.html',
  styleUrls: ['./eliminar-pedido.component.css']
})
export class EliminarPedidoComponent implements OnInit {

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
  EliminarPedido(){
    this.serviciosPedido.EliminarPedido(this.id).subscribe((datos : ModeloPedidos) => {
      alert('Datos Eliminados Corectamente');
      this.router.navigate(['/pedidos/eliminar-pedido'])
    }, (error : any ) => {
      alert('Error Al Eliminar los Datos')
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPedidos } from 'src/app/modelos/pedido.modelo';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';


@Component({
  selector: 'app-compar',
  templateUrl: './compar.component.html',
  styleUrls: ['./compar.component.css']
})
export class ComparComponent implements OnInit {


  id:string = '';

  fgValidador: FormGroup = this.fg.group({
    'id_producto': ['', [Validators.required]],
    'personaId': ['', [Validators.required]],
    'Precio': ['', [Validators.required]],
    'cantidad': ['', [Validators.required]],
    'tipoEntrega': ['', [Validators.required]],
    'total': ['', [Validators.required]]
  });

  constructor(private fg: FormBuilder,
    private router: Router,
    private serviciosPedido : PedidoService) { }

  ngOnInit(): void {
  }


  ComparUnProducto(){
    let precio = parseInt(this.fgValidador.controls["Precio"].value);
    let cantidad = parseInt(this.fgValidador.controls["cantidad"].value);
    let total = precio * cantidad;
    let id_producto = this.fgValidador.controls['id_producto'].value;
    let personaId = this.fgValidador.controls['personaId'].value;
    let tipoEntrega = this.fgValidador.controls['tipoEntrega'].value;
    let pedido = new ModeloPedidos();
    pedido.id_producto = id_producto;
    pedido.personaId = personaId;
    pedido.cantidad = cantidad;
    pedido.total = total;
    pedido.tipoEntrega = tipoEntrega;
    this.serviciosPedido.CrearPedido(pedido).subscribe((datos : ModeloPedidos) =>{
      alert(`Total a pagar ${total}, Le agradeccemos elegir nuestros servicios`)
      this.router.navigate(['/listar-productos'])
    },(error : any) => {
      alert('Error al Intertar Realizar Su Compra')
    });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPedidos } from '../modelos/pedido.modelo';
import { SeguiridadService } from './seguiridad.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url = 'http://localhost:3000';
  token: string = '';
  constructor(private http : HttpClient, private serviciosSeguridad : SeguiridadService ) {
    this.token = this.serviciosSeguridad.ObtenerToken();
   }

  CrearPedido(pedido : ModeloPedidos) : Observable<ModeloPedidos>{
    return this.http.post<ModeloPedidos>(`${this.url}/pedidos`,pedido,{
      headers : new HttpHeaders({

      })
    });
  }

  ObtenerPedidos(): Observable<ModeloPedidos[]>{
    return this.http.get<ModeloPedidos[]>(`${this.url}/pedidos`);

  }

  ObtenerPedidoPorId(id:string): Observable<ModeloPedidos>{
    return this.http.get<ModeloPedidos>(`${this.url}/pedidos/${id}`);

  }

  ActualizarPedido(pedido: ModeloPedidos): Observable<ModeloPedidos>{
    return this.http.put<ModeloPedidos>(`${this.url}/pedidos/${pedido.id}`,pedido,{
      headers : new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarPedido(id : string): Observable<any>{
    return this.http.delete(`${this.url}/pedidos/${id}`,{
      headers : new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}

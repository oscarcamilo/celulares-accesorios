import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloResetearClave } from '../modelos/cambiar-clave.modelo';
import { ModeloCambiarClave, } from '../modelos/credenciales.modelo';
import { SeguiridadService } from './seguiridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClaveService {
   url = 'http://localhost:3000';
   token: string = '';
  constructor(private http: HttpClient, private serviciosSeguridad : SeguiridadService ) {
    this.token = this.serviciosSeguridad.ObtenerToken()}

  CambiarContrse├▒aDeUsuario(persona : ModeloCambiarClave): Observable<ModeloCambiarClave>{
    return this.http.post(`${this.url}/actualizarPassword/`,persona,{
      headers : new HttpHeaders({
        'Authorization': `Bearer ${this.token}`

    })
    });
  }

  RecuperarContrse├▒aDeUsuario(persona : ModeloResetearClave): Observable<ModeloResetearClave>{
    return this.http.post<ModeloResetearClave>(`${this.url}/recuperarPassword/`,persona,{
       headers : new HttpHeaders({

    })
    });
  }

}

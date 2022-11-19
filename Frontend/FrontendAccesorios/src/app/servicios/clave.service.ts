import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloResetearClave } from '../modelos/cambiar-clave.modelo';
import { ModeloCambiarClave, } from '../modelos/credenciales.modelo';

@Injectable({
  providedIn: 'root'
})
export class ClaveService {
   url = 'http://localhost:3000';

  constructor(private http: HttpClient ) {
   }

  CambiarContrseñaDeUsuario(persona : ModeloCambiarClave): Observable<ModeloCambiarClave>{
    return this.http.post(`${this.url}/actualizarPassword/`,persona,{
      headers : new HttpHeaders({

    })
    });
  }

  RecuperarContrseñaDeUsuario(persona : ModeloResetearClave): Observable<ModeloResetearClave>{
    return this.http.post<ModeloResetearClave>(`${this.url}/recuperarPassword/`,persona,{
       headers : new HttpHeaders({

    })
    });
  }

}

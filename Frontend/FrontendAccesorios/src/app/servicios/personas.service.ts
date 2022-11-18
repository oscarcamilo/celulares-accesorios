import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguiridadService } from 'src/app/servicios/seguiridad.service';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  url = 'http://localhost:3000';
  token: string = '';
  constructor(private http: HttpClient,
    private serviciosSeguridad: SeguiridadService ) {
      this.token = this.serviciosSeguridad.ObtenerToken();
     }


  ObtenerRegistro(): Observable<ModeloPersona[]>{
    return this.http.get<ModeloPersona[]>(`${this.url}/personas`);

  }

  ObtenerRegistroPorId(id:string): Observable<ModeloPersona>{
    return this.http.get<ModeloPersona>(`${this.url}/personas/${id}`);

  }

  CrearPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.post<ModeloPersona>(`${this.url}/personas`,persona,{
      headers : new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.put<ModeloPersona>(`${this.url}/personas/${persona.id}`,persona,{
      headers : new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarPersona(id : string): Observable<any>{
    return this.http.delete(`${this.url}/personas/${id}`,{
      headers : new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
      })
    });
  }
}


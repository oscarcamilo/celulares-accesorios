import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { ModeloDatos } from '../modelos/datos.modelos';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguiridadService {

  
  url = 'http://localhost:3000';
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar())
  
  constructor(private http: HttpClient) {

  }

verificarSesionActual(){
  let datos = this.ObtenerInformacionSesion();
  if(datos){
    this.RefrescarDatosSesion(datos);
  }
}
RefrescarDatosSesion(datos: ModeloIdentificar){
  this.datosUsuarioEnSesion.next(datos);
}

ObtenerDatosUsuarioSesion(){
  return this.datosUsuarioEnSesion.asObservable();
}

Identificar(usuario: string, clave:string) : Observable<ModeloIdentificar>{
  return this.http.post<ModeloIdentificar>(`${this.url}/identificarPersona`,{
    usuario: usuario,
    clave: clave
  },{
    headers: new HttpHeaders({

    })
  })
}

AlmacernarSesion(datos:ModeloIdentificar){
  datos.estaIdentificado = true;
  let stringDatos = JSON.stringify(datos);
  localStorage.setItem("datosSesion",stringDatos);
  this.RefrescarDatosSesion(datos);
}

ObtenerInformacionSesion(){
  let datosString = localStorage.getItem("datosSesion");
  if(datosString){
    let datos = JSON.parse(datosString);
    return datos;
  }else{
    return null;
  }
}
EliminarInformacionSesion(){
  localStorage.removeItem("datosSesion");
  this.RefrescarDatosSesion(new ModeloIdentificar()) ;
}

SehaIniciadoSesion(){
  let datosString = localStorage.getItem("datosSesion");
  return datosString;
}

ObtenerToken(){
  let datosString = localStorage.getItem("datosSesion");
  if(datosString){
    let datos = JSON.parse(datosString);
<<<<<<< HEAD
    return datos.tk;
  }else{
    return '';
  }
}

=======
    return datos.tk;  
  }else{
    return '';
  }
>>>>>>> 10496ae41950b9bb44d9f3bd67a37fcda5476542
}

}

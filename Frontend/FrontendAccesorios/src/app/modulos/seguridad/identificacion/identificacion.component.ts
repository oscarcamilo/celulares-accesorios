import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguiridadService } from 'src/app/servicios/seguiridad.service';
import * as cryptoJS from "crypto-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador : FormGroup = this.fg.group({
    'usuario': ['',[Validators.required,Validators.email]],
    'clave' : ['',[Validators.required]]
  });

  constructor(private fg : FormBuilder, private serviciosSeguridad: SeguiridadService,private router: Router) { }

  ngOnInit(): void {
  }

  IdentifiacarUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.serviciosSeguridad.Identificar(usuario,claveCifrada).subscribe((datos:any) => {
      this.serviciosSeguridad.AlmacernarSesion(datos);
      alert("Datos Corerctos")
      this.router.navigate(["/inicio"]);
    },(error:any) => {
      //KO
      alert("Datos Incorrectos")
    });
    }
  //

}



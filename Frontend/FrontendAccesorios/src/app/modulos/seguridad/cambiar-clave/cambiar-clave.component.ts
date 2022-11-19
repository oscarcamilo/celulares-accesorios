import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCambiarClave } from 'src/app/modelos/credenciales.modelo';
import { ClaveService } from 'src/app/servicios/clave.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  fgValidador : FormGroup = this.fg.group({
    'usuario': ['',[Validators.required,Validators.email]],
    'clave' : ['',[Validators.required]]
  });

  constructor(private fg : FormBuilder,  private seguridadClave: ClaveService,private router: Router) { }

  ngOnInit(): void {
  }

  CambiarUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let p = new ModeloCambiarClave;
    p.usuario = usuario;
    p.clave = clave;
    this.seguridadClave.CambiarContrseñaDeUsuario(p).subscribe((datos: any) => {
      alert("Datos Corerctos")
      this.router.navigate(["/inicio"]);
    },(error:any) => {
      //KO
      alert("Datos Incorrectos")
    });
  }
}

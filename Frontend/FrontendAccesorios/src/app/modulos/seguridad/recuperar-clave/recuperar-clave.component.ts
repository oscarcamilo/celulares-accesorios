import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloResetearClave } from 'src/app/modelos/cambiar-clave.modelo';
import { ClaveService } from 'src/app/servicios/clave.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  fgValidador : FormGroup = this.fg.group({
    'usuario': ['',[Validators.required,Validators.email]]
  });

  constructor(private fg : FormBuilder,  private seguridadClave: ClaveService,private router: Router) { }

  ngOnInit(): void {
  }

  RestablecerUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let p = new ModeloResetearClave;
    p.correo = usuario;
    this.seguridadClave.RecuperarContrseñaDeUsuario(p).subscribe((datos: ModeloResetearClave) => {
      alert("Datos Corerctos")
      this.router.navigate(["/inicio"]);
    },(error:any) => {
      //KO
      alert("Datos Incorrectos")
    });
  }

}

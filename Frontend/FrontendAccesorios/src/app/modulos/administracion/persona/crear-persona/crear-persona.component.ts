import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {PersonasService} from 'src/app/servicios/personas.service';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  fgValidador : FormGroup = this.fg.group({
    'nombres' : ['',[Validators.required]],
    'apellidos' : ['',[Validators.required]],
    'correo': ['',[Validators.required,Validators.email]],
    'clave' : ['',[Validators.required]],
    'direccion' : ['',[Validators.required]],
    'telefono' : ['',[Validators.required]],
    'identificacion' : ['',[Validators.required]],
    'rol' : ['',[Validators.required]]

  });
  constructor(private fg : FormBuilder,private personaServicios : PersonasService,private router: Router) { }

  ngOnInit(): void {

  }

  GuardarPersona(){
    let nombres = this.fgValidador.controls["nombres"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let identificacion = this.fgValidador.controls["identificacion"].value;
    let rol = this.fgValidador.controls["rol"].value;
    let p = new ModeloPersona();
    p.nombres = nombres;
    p.apellidos = apellidos;
    p.correo = correo;
    p.clave = clave;
    p.direccion = direccion;
    p.telefono= telefono;
    p.identificacion=identificacion;
    p.rol =rol;
    this.personaServicios.CrearPersona(p).subscribe((datos : ModeloPersona) =>{
      alert('Datos Guardados Exitisamente')
      this.router.navigate(["/administracion/listar-persona"]);
    }, (error : any) =>{
      alert('Error Almacenar Datos')
    });
  }

}

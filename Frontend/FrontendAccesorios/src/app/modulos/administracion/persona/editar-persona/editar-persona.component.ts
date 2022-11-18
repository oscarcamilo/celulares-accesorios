import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {PersonasService} from 'src/app/servicios/personas.service';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {
  id : string = '';
  fgValidador : FormGroup = this.fg.group({
    'id': ['',[Validators.required]],
    'nombres' : ['',[Validators.required]],
    'apellidos' : ['',[Validators.required]],
    'correo': ['',[Validators.required,Validators.email]],
    //'clave' : ['',[Validators.required]],
    'direccion' : ['',[Validators.required]],
    'telefono' : ['',[Validators.required]],
    'identificacion' : ['',[Validators.required]],
    'rol' : ['',[Validators.required]]

  });
  constructor(private fg : FormBuilder,private personaServicios : PersonasService,private router: Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarPersona();
  }
  BuscarPersona(){
    this.personaServicios.ObtenerRegistroPorId(this.id).subscribe((datos : ModeloPersona) =>{
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      //this.fgValidador.controls["clave"].setValue(datos.clave);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["identificacion"].setValue(datos.identificacion);
      this.fgValidador.controls["rol"].setValue(datos.rol);
    });
  }
  EditarPersona(){
    let nombres = this.fgValidador.controls["nombres"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let correo = this.fgValidador.controls["correo"].value;
    //let clave = this.fgValidador.controls["clave"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let identificacion = this.fgValidador.controls["identificacion"].value;
    let rol = this.fgValidador.controls["rol"].value;
    let p = new ModeloPersona();
    p.nombres = nombres;
    p.apellidos = apellidos;
    p.correo = correo;
    //p.clave = clave;
    p.direccion = direccion;
    p.telefono= telefono;
    p.identificacion=identificacion;
    p.rol =rol;
    p.id= this.id;
    this.personaServicios.ActualizarPersona(p).subscribe((datos : ModeloPersona) =>{
      alert('Datos Actualizado Exitisamente')
      this.router.navigate(["/administracion/listar-persona"]);
    }, (error : any) =>{
      alert('Error Actualizado Datos')
    });
  }



}

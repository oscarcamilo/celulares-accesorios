import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {PersonasService} from 'src/app/servicios/personas.service';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';


@Component({
  selector: 'app-eliminar-persona',
  templateUrl: './eliminar-persona.component.html',
  styleUrls: ['./eliminar-persona.component.css']
})
export class EliminarPersonaComponent implements OnInit {

  id : string = '';
  fgValidador : FormGroup = this.fg.group({
    'id': ['',[Validators.required]],
    'nombres' : ['',[Validators.required]],
    'apellidos' : ['',[Validators.required]],
    'correo': ['',[Validators.required,Validators.email]],
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
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["identificacion"].setValue(datos.identificacion);
      this.fgValidador.controls["rol"].setValue(datos.rol);
    });
  }
    EliminarPersona(){
    this.personaServicios.EliminarPersona(this.id).subscribe((datos : ModeloPersona) =>{
      alert('Datos Eliminados  Exitosamente')
      this.router.navigate(["/administracion/listar-persona"]);
    }, (error : any) =>{
      alert('Error Eliminar Datos')
    });
  }


}

import { Component, OnInit } from '@angular/core';
import {PersonasService} from 'src/app/servicios/personas.service';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {


  listadoRegistros : ModeloPersona[] = [];

  constructor(private personaServicios : PersonasService ) { }

  ngOnInit(): void {
    this.ObtenerPersonas();
  }

  ObtenerPersonas(){
    this.personaServicios.ObtenerRegistro().subscribe((datos: ModeloPersona[]) =>
    {
      this.listadoRegistros = datos;
    });

  }

}

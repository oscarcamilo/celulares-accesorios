import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguiridadService } from 'src/app/servicios/seguiridad.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

    seInicioSesion: boolean = false;

    subs: Subscription = new Subscription();
  constructor(private serviciosSeguridad: SeguiridadService) { }

  ngOnInit(): void {
    this.subs = this.serviciosSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar) =>{
      this.seInicioSesion = datos.estaIdentificado;
     } )
  }

}

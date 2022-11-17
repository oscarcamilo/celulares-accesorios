import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguiridadService } from 'src/app/servicios/seguiridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private serviciosSeguridad: SeguiridadService,
    private router: Router) { }

  ngOnInit(): void {
    this.serviciosSeguridad.EliminarInformacionSesion();
    this.router.navigate(["/inicio"]);
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SeguiridadService } from 'src/app/servicios/seguiridad.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidarSesionGuard implements CanActivate {

  constructor(private serviciosSeguridad: SeguiridadService,private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.serviciosSeguridad.ObtenerInformacionSesion()){
        return true;
      }else{
        this.router.navigate(['/inicio']);
        return false;
      }
  }

}

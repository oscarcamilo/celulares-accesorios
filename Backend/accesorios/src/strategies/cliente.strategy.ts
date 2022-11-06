import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services/autenticacion.service";

export class EstrategiaCliente implements AuthenticationStrategy{
    name: string = 'cliente';

constructor(
    @service(AutenticacionService)
    public authenticationService : AutenticacionService
){
    
}
    async authenticate(request: Request): Promise<UserProfile | undefined>{
        let token = parseBearerToken(request);
        if(token){
            let datos = this.authenticationService.ValidarTokenJWT(token);
            if(datos){
                if(datos.data.rol == 'cliente' ){
                    let perfil: UserProfile = Object.assign({
                        nombre: datos.data.nombre
                    });
                    return perfil;
                }
                throw new HttpErrors[401]('No tiene acceso a este Recurso')
            }else{
                throw new HttpErrors[401]("El Token Invalido")}
        }else{
            throw new HttpErrors[401]("No se ha enviado el token")
        }
    }
}
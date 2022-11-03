import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { PersonaRepository } from '../repositories';

const generador = require('password-generator');
const cryptojs = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepositorio: PersonaRepository
    /* Add @inject to inject parameters */) {}

  //Genera una clave alatoreo facil de recordar de 8 digitos
  GeneradorClave()
  {
    return generador(8,false);
  }

  CifraClave(clave: string)
  {
    return cryptojs.MD5(clave).toString();
  }
}

import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import fetch from 'node-fetch';
import { Llaves } from '../config/llaves';
import {CambiarClave, Credenciales, Persona, ResetearClave} from '../models';
import {PersonaRepository} from '../repositories';
import { AutenticacionService } from '../services';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AutenticacionService)
    public autenticacionService : AutenticacionService
  ) {}
    //Identifica una persona enla BD
  @post("/identificarPersona",{
    responses:{
      '200':{
        description: "Identificacion de usuarios"
      }
    }
  })
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.autenticacionService.IdentificarPersona(credenciales.usuario, credenciales.clave)
    if(p){
      let token = this.autenticacionService.GenerarTokenJWT(p);
      return{
        datos:{
          nombre: p.nombres,
          correo: p.correo,
          id: p.id,
          rol : p.rol
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Datos invalidos");
    }
  }
  //Crea un persona, notificando a travez de  sms y correo
  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    //Generar Clave 
    let clave = this.autenticacionService.GeneradorClave();
    let claveCifrada = this.autenticacionService.CifraClave(clave);
    persona.clave = claveCifrada;
    let p = await  this.personaRepository.create(persona);
    //Notificar por correo al usuario la clave generada
    let destino = persona.correo;
    let asunto = 'Celulares Y Accesorios Mision TIC 💻';
    let contenido = `Celulares Y Accesorios: Le da la "Bienvenidad", Su  Nombre y Apellido Registrados son:  
     ${persona.nombres} ${persona.apellidos}, Su Nombre de Usuario es : ${persona.correo}, 
     Su contaseña es: <b>${clave}</b>
     </br> Su acceso a la plataforma, Celulares Y Accesorios Mision TIC 💻 es de , ${persona.rol} `;
    fetch(`${Llaves.urlServicioNotificaciones}correo-electronico?destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    .then((data: any ) => {
      console.log(data);
      console.log('Notificar por correo al usuario la clave generada');
    });
    //Notificar por sms al usuario la clave generada
    let mensaje = `Celulares Y Accesorios: Le da la "Bienvenidad", Su  Nombre y Apellido Registrados son:  
    ${persona.nombres} ${persona.apellidos}, Su Nombre de Usuario es : ${persona.correo}, 
    Su contaseña es: ${clave}, Su acceso a la plataforma, Celulares Y Accesorios Mision TIC 💻 es de, ${persona.rol} `;
    let telefono = '3226552785';
    fetch(`${Llaves.urlServicioNotificaciones}sms?mensaje=${mensaje}&telefono=${telefono}`)
    .then((data: any ) => {
      console.log(data);
      console.log('Notificar por sms al usuario la clave generada');
    });
    return p;
  }
  //Recuperacion de Contraseña a traves de backend y notificado por sms
  @post('/recuperarPassword')
  @response(200, {    
    content: { 'application/json': { schema: getModelSchemaRef(ResetearClave) } },
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave)          
          
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<Object> {
    let persona = await this.personaRepository.findOne({where: {correo: resetearClave.correo}})
    if(!persona){
      throw new HttpErrors[401]("Este usuario no existe.");
    } 
    let clave = this.autenticacionService.GeneradorClave();
    let claveCifrada = this.autenticacionService.CifraClave(clave);
    persona.clave = claveCifrada;
    await this.personaRepository.update(persona); 
    //Recuperacion por Mensaje sms   
    /*let mensaje = `Hola ${persona.nombres} ${persona.apellidos}, Le informa que se ha Cambiado su contraseña, su nueva contraseña es: ${clave} `;
    let destinoSms = '3226552785';
    fetch(`${Llaves.urlServicioNotificaciones}sms?mensaje=${mensaje}&telefono=${destinoSms}`)
      .then((data: any) => {
        console.log(data);
        console.log('Notificar por sms al usuario la clave generada');
      });*/
      //Recuperacion por Correo
      let destino = persona.correo;
      let asunto = 'Reseteo de la Contraseña :🔑🔑';
      let contenido = `Hola ${persona.nombres} ${persona.apellidos}, </br> Celulares Y Accesorios: Le informa que se ha Cambiado su contraseña, su nueva contraseña es: <b> ${clave}</b>`;
      fetch(`${Llaves.urlServicioNotificaciones}correo-electronico?destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any ) => {
        console.log(data);
        console.log('Notificar por correo al usuario la clave generada');
      });
    return {
      envio: "OK"
    };
  }
  //Cambio de contaseña por parte del Usuario noticacion por correo
  @authenticate("admin","cliente")
  @post('/actualizarPassword')
  @response(200, {    
    content: { 'application/json': { schema: getModelSchemaRef(CambiarClave) } },
  })
  async cambiarPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambiarClave)          
          
        },
      },
    })
    cambioClave: CambiarClave,
  ): Promise<Object> {
    let persona = await this.personaRepository.findOne({where: {correo: cambioClave.correo}})
    if(!persona){
      throw new HttpErrors[401]("Este usuario no existe.");
    } 
    let clave = cambioClave.nuevaclave;
    let claveCifrada = this.autenticacionService.CifraClave(clave);
    persona.clave = claveCifrada;
    await this.personaRepository.update(persona);    
    //Recuperar por correo
    let destino = persona.correo;
    let asunto = 'Tu nueva Contraseña es :🔑🔑';
    let contenido = `Hola ${persona.nombres} ${persona.apellidos}, </br> Celulares Y Accesorios: Le informa que se ha Cambiado su contraseña, su nueva contraseña es: <b> ${clave}</b>`;
    fetch(`${Llaves.urlServicioNotificaciones}correo-electronico?destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    .then((data: any ) => {
      console.log(data);
      console.log('Notificar por correo al usuario la clave generada');
    });
    return {
      envio: "OK"
    };
  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }
  @authenticate("admin")
  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }
  @authenticate("admin") 
  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}

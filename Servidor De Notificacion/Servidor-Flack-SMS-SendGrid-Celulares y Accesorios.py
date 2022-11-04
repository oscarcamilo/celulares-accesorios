# -*- coding: utf-8 -*-
"""
Created on Wed Oct 19 19:11:01 2022

@author: Usuario
"""

import os
from flask import Flask
from twilio.rest import Client
from flask import request
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)

@app.route("/")
def inicio():
    test = os.environ.get("Test")
    return test
        
@app.route("/sms")
def sms():
    try:
        # Download the helper library from https://www.twilio.com/docs/python/install
    
        
        # Find your Account SID and Auth Token in Account Info
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")
        message = client.messages.create(
          body=contenido,
          from_='+14245443296',
          to= '+57' + destino
        )
        
        print(message.sid)
        return "Mensaje Enviado Correctamente"
    except Exception as e:
        print(e)
        return "Error al Enviar el Mensaje"
    
@app.route("/correo-electronico")
def correo():
    destino = request.args.get("destino")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("contenido")
    
    message = Mail(
    from_email= 'ajedrezandrey@gmail.com',
    to_emails=destino,
    subject=asunto,
    html_content= mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo enviado Corectamente"
    
    except Exception as e:
        print(e.message)
        return "Error al Enviar el Correo "
        
   
        
if __name__ == '__main__':
    app.run()
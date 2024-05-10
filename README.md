# ohmydog
Sistema web para administrar una veterinaria. 

La aplicación permite gestionar la información de los clientes, turnos y publicaciones. Pueden acceder los administradores y los clientes.
Está construida bajo la arquitectura MVC.

## Requisitos técnicos:
* Node.js 20.11.1
* npm 10.2.4
* Postgresql
* Docker y docker-compose como deseable [Instalación aquí](https://docs.docker.com/compose/install/)

## Instalación local:
### Sin Docker-Compose
* ```git clone https://github.com/alanberns/ohmydog.git```
* ```cd ohmydog```
* ```cp .env.example .env```
* ```npm install```
* Levantar una db Postgresql o con ```docker run --name ohmydog-postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres```
* ```npx prisma migrate dev --name init```
* ```node pruebas/resetdb.js```
* ```npm start```
  
La app levanta en el puerto 3000.

Postgres
 - db: postgres
 - user: postgres
 - pass: 1234

### Con Docker-Compose
dentro del direcotorio raiz: ```docker-compose up -d```

Para eliminar todos los contenedoras: ```docker-compose down```

La app levanta el puerto 3000.

Postress 
- db: ohmydog
- user: admin
- pass: 1234


### ADMIN DEL SISTEMA:
user: ohmydogis2@gmail.com

pass: 12345



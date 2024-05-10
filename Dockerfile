# Usa una imagen base de Node.js
FROM node:14
RUN apt update
RUN  apt install postgresql-client -y

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .
RUN cp .env.example .env

RUN chmod +x /usr/src/app/entrypoint.sh
# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
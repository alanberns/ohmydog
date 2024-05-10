#!/bin/bash

echo "Hola desde el script Bash"
npx prisma generate

IP_DEL_CONTENEDOR_DB=$(ping -c 1 db | awk 'FNR == 2 {print $5}' | tr -d '():')
export DATABASE_URL="postgresql://admin:1234@$IP_DEL_CONTENEDOR_DB:5432/ohmydog?schema=public"

npx prisma migrate dev --name init
node pruebas/resetdb.js
node app.js
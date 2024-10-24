# Node.js + Sequelize - API-REST-EFI

Este proyecto es una API construida con Node.js, Express, Sequelize y MySQL.

## Requisitos previos

- Node.js instalado
- MySQL en ejecución

## Instalación

1. Clona este repositorio y navega a la carpeta del proyecto:

```bash
git clone <URL-del-repositorio>
cd API-REST-EFI
```

### 2. Instala las dependencias
npm install

### 3. Crea un archivo .env en la raíz del proyecto con la configuración de la base de datos:
```bash
DB_USERNAME = root - usuario de mysql personal  
DB_PASSWORD = root1234 - contraseña de mysql personal  
DB_DATABASE = nombre_de_tu_db - nombre de base de datos de mysql personal   
DB_HOST = 127.0.0.1    
PORT = 4000   
```

### 4. Crea la base de datos en MySQL:
Ubicados dentro de la carpeta del proyecto ejecutamos `cd src` y luego `node createDatabase.js`

### 5. Ejecutar Migraciones  
Ejecuta las migraciones para crear las tablas en la base de datos desde el directorio src:  
`npx sequelize-cli db:migrate`  

### 6. Ejecutar seeders
`npx sequelize-cli db:seed:all`

### 7. Ejecutar el Servidor  
Inicia el servidor con el siguiente comando:  
`npm start`

## Estructura del Proyecto
├── src  
│   ├── config  
│   │   └── config.json            # Configuración de la base de datos para Sequelize  
│   ├── controllers  
│   │   └── userController.js      # Controlador para manejar los usuarios  
│   ├── migrations  
│   │   └── [timestamp]-create-user.js  # Migración para crear la tabla de usuarios  
│   ├── models  
│   │   ├── index.js               # Configuración de la conexión de Sequelize  
│   │   └── model.js               # Definición de cada modelo
│   ├── routes  
│   │   └── userRoutes.js          # Rutas para la API de usuarios  
├── .env                           # Variables de entorno (DB credentials, etc.)  
├── createDatabase.js              # Crear database a traves de un archivo.js  
├── package.json                   # Dependencias del proyecto y scripts  
└── server.js                      # Configuración del servidor Express  

## Endpoints
Para todos los endpoints de la API usaremos la dirección `127.0.0.1:*nuestropuerto*/api/` o `localhost:*nuestropuerto*/api/`.

En las rutas que necesitemos un token para acceder lo enviaremos mediante el header `Authorization`

1. Usuarios:
    1. POST `/register` para registrar un usuario. Necesitamos lo siguiente en el body: "name", "email", "password", "type" (Clave foranea del tipo de usuario).
    2. POST `/login` para recibir nuestro token de sesión. Necesitamos enviar lo siguiente en el body: "email", "password"
    3. GET `/users` para recibir un listado de todos los usuarios. Necesitamos enviar un token de usuario tipo admin.
    4. GET `/users/:id` para recibir los datos de un usuario. Necesitamos enviar un token de usuario tipo admin.
    5. GET `/verifyToken` para recibir la información de nuestro token. Necesitamos enviar un token de cualquier tipo de usuario.

2. Clientes:
    1. POST `/clients` para registrar un nuevo cliente. Necesitamos enviar un token de usuario tipo admin o agente y lo siguiente en el body: "dni", "phoneNumber", "user" (Clave foranea del usuario).
    2. GET `/clients` para recibir un listado de todos los clientes. Necesitamos token de usuario tipo admin o de agente.
    router.get('/clients/:id', getClientById);
    3. GET `/clients/:id` para recibir los datos de un cliente en específico.

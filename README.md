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

<details>
    
<summary>1. Usuarios</summary>

    1. POST '/register' para registrar un usuario. Necesitamos lo siguiente en el body: "name", "email", "password", "type" (Clave foránea del tipo de usuario).
    
    2. POST '/login' para recibir nuestro token de sesión. Necesitamos enviar lo siguiente en el body: "email", "password".
    
    3. GET '/users' para recibir un listado de todos los usuarios. Necesitamos enviar un token de usuario tipo admin.
    
    4. GET '/users/:id' para recibir los datos de un usuario. Necesitamos enviar un token de usuario tipo admin.
    
    5. GET '/verifyToken' para recibir la información de nuestro token. Necesitamos enviar un token de cualquier tipo de usuario.
</details>

<details>
    
<summary>2. Clientes</summary>

    1. POST '/clients' para registrar un nuevo cliente. Necesitamos enviar un token de usuario tipo admin o agente y lo siguiente en el body: "dni", "phoneNumber", "user" (Clave foránea del usuario).
    
    2. GET '/clients' para recibir un listado de todos los clientes. Necesitamos token de usuario tipo admin o de agente.
    
    3. GET `/clients/:id` para recibir los datos de un cliente en específico.
</details>

<details>
    
<summary>3. Agentes</summary>

    1. POST '/agents' para registrar un nuevo agente. Necesitamos enviar un token de tipo admin lo siguiente en el body: "user" (Clave foranea del usuario).
    
    2. GET '/agents' para recibir un listado de todos los agentes. Nececsitamos enviar un token de tipo admin.
    
    3. GET '/agents/:id' para recibir los datos de un agente.
</details>

<details>
    
<summary>4. Propiedades</summary>

    1. POST '/properties' para registrar una nueva propiedad. Necesitamos enviar un token de tipo agente y lo siguiente en el body: "address", "propertyType" (Clave foránea del tipo de propiedad), "price", "status" (Clave foránea al estado de la propiedad), "description", "size".
    
    2. POST '/properties/filter' para recibir un listado filtrado de propiedades. Podemos enviar lo siguiente en el body:
    "price" Enviamos un JSON con los siguientes atributos: "gte" para precio mínimo y "lte" para precio máximo.
    "type" El tipo de propiedad.
    "size" Enviamos un JSON con los siguientes atributos: "gte" para tamaño mínimo y "lte" para tamaño máximo.
    
    3. GET '/properties' para recibir un listado de todas las propiedades.
    
    4. GET '/properties/find/:id' para recibir los datos de una propiedad.
    
    5. GET '/properties/agent' para recibir un listado de las propiedades del agente actual. Nececsitamos enviar un token de tipo agente.
    
    6. PUT '/properties/update/:id' para actualizar una propiedad. Necesitamos enviar un token de tipo agente, el cual debe ser el dueño de la propiedad y lo siguiente en el body: "address", "propertyType" (Clave foránea del tipo de propiedad), "price", "status" (Clave foránea al estado de la propiedad), "description", "size".
    
    7. DELETE 'properties/:propertyId' para borrar una propiedad. Necesitamos enviar un token de tipo agente, el cual debe ser el dueño de la propiedad.
</details>

<details>
    
<summary>5. Alquileres</summary>

    1. POST '/rents' para registrar un nuevo alquiler. Necesitamos enviar un token de tipo agente, el cual debe ser dueño de la propiedad que elijamos y lo siguiente en el body: "property" (Clave foránea de la propiedad), "client" (Clave foránea del cliente), startDate, finishDate, monthlyAmount, status (Clave foránea al estado del alquiler).
    
    2. GET '/rents' para recibir un listado de todos los alquileres'.
    
    3. GET '/rents/find/:id' para recibir los datos de un alquiler en particular.
    
    4. GET '/rents/agent' para recibir un listado de los alquileres del agente actual. Necesitamos enviar un token de tipo agente.
    
    5. PUT '/rents/:id' para actualizar un alquiler. Necesitamos enviar un token de tipo agente, el cual debe ser dueño de la propiedad que elijamos y a la que la cambiemos y lo siguiente en el body: "property" (Clave foránea de la propiedad), "client" (Clave foránea del cliente), startDate, finishDate, monthlyAmount, status (Clave foránea al estado del alquiler).
    
    6. DELETE '/rents/:id' para borrar un alquiler. Necesitamos enviar un token de tipo agente, el cual debe ser dueño de la propiedad del alquiler que elijamos.
</details>

<details>
    
<summary>6. Ventas</summary>

    1. POST '/sales' para registrar una nueva venta. Necesitamos enviar un token de tipo agente, el cual debe ser dueño de la propiedad que elijamos y lo siguiente en el body: "property" (Clave foránea de la propiedad), "client" (Clave foránea del cliente), amount, status (Clave foránea al estado de la venta).
    
    2. GET '/sales' para recibir un listado de todas las ventas.
    
    3. GET '/sales/find/:id' para recibir los datos de una venta en particular.
    
    4. GET '/sales/agent' para recibir un listado de las ventas del agente actual. Necesitamos enviar un token de tipo agente.
    
    5. PUT '/sales/:id' para actualizar una venta. Necesitamos enviar un token de tipo agente, el cual debe ser dueño de la propiedad que elijamos y a la que la cambiemos y lo siguiente en el body: "property" (Clave foránea de la propiedad), "client" (Clave foránea del cliente), date, amount, status (Clave foránea del estado de la venta).
    
    6. DELETE '/sales/:id' para borrar un alquiler. Necesitamos enviar un token de tipo agente, el cual debe ser dueño de la propiedad de la venta que elijamos.
</details>

<details>
    
<summary>7. Tipos</summary>
    
    1. GET '/propertyType' para recibir un listado de todos los tipos de propiedades.
    
    2. GET '/userType' para recibir un listado de todos los tipos de usuarios.
</details>

<details>
    
<summary>8. Estados</summary>
    
    1. GET '/propertyStatus' para recibir un listado de todos los estados de propiedades.
    
    2. GET '/rentStatus' para recibir un listado de todos los estados de alquileres.

    3. GET '/saleStatus' para recibir un listado de todos los estados de ventas.
</details>

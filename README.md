# Proyecto Serverless: API para Gestión de Productos y Personajes

Este proyecto implementa una API Serverless en AWS para gestionar productos, personajes y planetas, utilizando AWS Lambda, API Gateway, DynamoDB y otros servicios de AWS.

## Requisitos Previos

- Node.js v20.15.1 o superior
- AWS CLI configurado
- Cuenta de AWS
- Serverless Framework instalado globalmente
  ```bash
  npm install -g serverless
  ```

## Instalación y Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/chaicopadillag/swapi-serverless-ts
   swapi-serverless-ts

   ```

2. Instala las dependencias:

```
npm install
```

3. Variables de entorno:

Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto con las siguientes variables:

```
SWAPI_API=https://swapi.py4e.com/api
AWS_REGION=us-east-1
AWS_USER_ID=tu-user-id

```

## Despliegue

Para desplegar las funciones Lambda y otros recursos, ejecuta el siguiente comando:

```
serverless deploy --stage dev

```

# Uso de las Funciones

- Obtener Personajes de SWAPI

  Endpoint: /characters
  Método: GET
  Descripción: Recupera una lista de personajes de la API de Star Wars.
  Ejemplo de petición:

```

  curl https://mcdzwthly0.execute-api.us-east-1.amazonaws.com/characters

```

- Obtener las Planetas de SWAPI

  Endpoint: /planets
  Método: GET
  Descripción: Recupera una lista de las planetas de la API de Star Wars.
  Ejemplo de petición:

```

  curl https://mcdzwthly0.execute-api.us-east-1.amazonaws.com/planets

```

- Crear un Producto

  Endpoint: /products
  Método: POST
  Descripción: Crea un nuevo producto en la base de datos.
  Ejemplo de petición:

```

  curl --location 'https://mcdzwthly0.execute-api.us-east-1.amazonaws.com/products' \
--header 'Content-Type: application/json' \
--data '{
    "price": 10,
    "size": "M",
    "stock": 100,
    "title": "Camisa Hombre"
}'

```

- Obtener Todos los Productos

  Endpoint: /products
  Método: GET
  Descripción: Recupera una lista de todos los productos.
  Ejemplo de petición:

```
  curl --location 'https://mcdzwthly0.execute-api.us-east-1.amazonaws.com/products'

```

Ejecución Local

Ejecuta el proyecto localmente:

```
npm run dev
```

Esto levantará un servidor local en http://localhost:4000, desde donde puedes hacer peticiones a los endpoints definidos.
Pruebas

Para ejecutar las pruebas unitarias del proyecto:

```
npm run test:cov

```

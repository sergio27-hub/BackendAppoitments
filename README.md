# BackendAppoitments
Backend this appointemnt server

# REST-FULL-API

Esta API es un servicio integral diseñado para la gestión de citas de tunning de coches, reservas de servicios de coches y venta de productos relacionados con el tunning y el mantenimiento automotriz. Proporciona métodos CRUD para interactuar con los datos de citas, reservas de servicios y productos. Los usuarios pueden utilizar la API para:

1. **Crear citas de tunning de coches**: Permite a los clientes programar citas para servicios de tunning de coches, como ajustes de motor, instalación de piezas de rendimiento, personalización de carrocería, etc. Se pueden proporcionar detalles como la fecha y hora de la cita, los servicios solicitados, el vehículo y cualquier otra información relevante.

2. **Crear reservas de servicios de coches**: Permite a los clientes reservar servicios de mantenimiento y reparación para sus coches, como cambios de aceite, inspecciones técnicas, reparaciones mecánicas, etc. Se pueden especificar detalles como la fecha y hora de la reserva, el tipo de servicio requerido, el vehículo y más.

3. **Gestionar productos**: La API permite a los usuarios administrar el inventario de productos relacionados con el tunning y el mantenimiento automotriz. Esto incluye la capacidad de agregar nuevos productos, actualizar información de productos existentes, ver detalles de productos y eliminar productos del inventario.

4. **Leer citas y reservas de servicios**: Los usuarios pueden recuperar información sobre citas de tunning de coches, reservas de servicios y productos existentes. Esto incluye la capacidad de buscar citas y reservas por fecha, tipo de servicio, cliente, vehículo, etc.

5. **Actualizar y cancelar citas y reservas**: Los usuarios tienen la capacidad de modificar o cancelar citas de tunning de coches y reservas de servicios según sea necesario. Esto puede incluir cambios en la fecha, hora, servicios solicitados, información del cliente, etc.

La API está diseñada para ser segura y escalable, utilizando prácticas recomendadas de seguridad como autenticación y autorización para proteger los datos sensibles de los clientes y los detalles de los productos. Además, puede ofrecer funcionalidades adicionales, como notificaciones por correo electrónico para recordatorios de citas y reservas, integraciones con sistemas de gestión de inventarios, generación de informes de ventas, entre otros.

En resumen, esta API de citas de tunning de coches, servicios de coches y productos ofrece una solución completa y flexible para la gestión eficiente de citas de tunning, reservas de servicios y ventas de productos relacionados con el automovilismo.


---

## Comenzando

Estas instrucciones te proporcionarán una copia del proyecto en funcionamiento en tu máquina local para fines de desarrollo y pruebas. Mira la sección de instalación para conocer cómo desplegar el proyecto.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente antes de continuar:

- [Git](https://git-scm.com/): Para clonar el repositorio del proyecto.
- [Node.js](https://nodejs.org/): Para ejecutar JavaScript en el servidor.
- [npm](https://www.npmjs.com/) (o [Yarn](https://yarnpkg.com/)): Para gestionar las dependencias del proyecto.

### Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio**: Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

    ```bash
    git clone https://github.com/sergio27-hub/BackendAppoitments.git
    ```

2. **Navega al directorio del proyecto**: Cambia al directorio recién creado del proyecto:

    ```bash
    cd Backend-project
    ```

3. **Instala las dependencias**: Utiliza npm (o yarn) para instalar las dependencias del proyecto. Ejecuta el siguiente comando:

    ```bash
    npm install
    ```

4. **Cómo correr un conjunto de pruebas automatizadas**: Ejecuta el siguiente comando para ejecutar las pruebas automatizadas del sistema:

    ```bash
    npm run test
    ```
5. **Como crear imagen y desplegar app con Docker**: Ejecuta el siguiente comando para ejecutar la creacion de la imagen y el contenedor donde almacenara tu api y mongo-db:
    ```bash
    npm run compose:app
    ```
--


## Arquitectura
-------
📦BACKEND-PROJECT
  ┣ 📂.vscode
  ┃ ┗ 📜launch.json # Debugging configuration file
  ┣ 📂postman
  ┃ ┗ 📜project3.postman_collection.json # Postman colection
  ┃ ┗ 📜project3.postman_test_run.json # Postman test run file
  ┣ 📂docker
  ┃ ┣ 📜docker-compose.app.yml # Build and deploy app
  ┃ ┗ 📜docker-compose.test.yml # Deploy Sonarqube
  ┣ 📂src
  ┃ ┣ 📂config # Modules configurations
  ┃ ┣ 📂controllers # API controllers
  ┃ ┣ 📂libs #initial Role setup
  ┃ ┣ 📂loaders # Setup server and services on load
  ┃ ┣ 📂middlewares # API middlewares
  ┃ ┣ 📂openapi # Openapi (Swagger v3) specification
  ┃ ┃ ┣ 📂examples
  ┃ ┃ ┣ 📂responses
  ┃ ┃ ┣ 📂schemas
  ┃ ┃ ┣ 📂security
  ┃ ┣ 📂routes # API routes
  ┃ ┣ 📂services # External services for db
  ┃ ┣ 📂utils # use in initialize login
  ┃ ┃ ┣ 📜encrypt.js
  ┃ ┃ ┣ 📜index.js
  ┃ ┃ ┣ 📜logger.js
  ┃ ┃ ┣ 📜paggination.js
  ┃ ┣ 📜app.js # App main
  ┃ ┣ 📜config.js # Centralize user variables
  ┃ ┗ 📜index.js # Launch app
  ┣ 📂test
  ┃ ┣ 📂controllers
  ┃ ┣ 📂loaders
  ┃ ┣ 📂middlewares
  ┃ ┗ 📂services
  ┃ ┗ 📜sonar.js
  ┣ 📜.babelrc
  ┣ 📜.dockerignore
  ┣ 📜.editorconfig
  ┣ 📜.env
  ┣ 📜.eslintrc.js
  ┣ 📜.gitignore
  ┣ 📜Dockerfile
  ┣ 📜LICENSE
  ┣ 📜README.md
  ┣ 📜env.template
  ┣ 📜package-lock.json
  ┗ 📜package.json


---

### Dependencias principales

- **express**: Un marco web para Node.js que facilita la creación de aplicaciones web y API.
- **express-openapi**: Una herramienta para generar y validar API RESTful automáticamente a partir de especificaciones OpenAPI.
- **swagger-ui-express**: Middleware de Express para servir la interfaz de usuario de Swagger UI para la documentación de API.
- **morgan**: Un middleware de registro de solicitudes HTTP para Express.
- **winston**: Una biblioteca de registro para Node.js.
- **got**: Una biblioteca de solicitud HTTP para Node.js.

### Linter

Utiliza los siguientes comandos npm para ver y corregir errores y advertencias del linter:

```bash
npm run lint  # Ver los errores y advertencias del linter
npm run lint:fix  # Corregir automáticamente los errores del linter
```

### Pruebas

Se han creado scripts npm para ejecutar fácilmente las pruebas:

```bash
npm run test  # Ejecutar todas las pruebas
npm run test:watch  # Ejecutar las pruebas en modo observador
npm run test:report  # Generar el reporte de pruebas para SonarQube (SonarQube debe estar en funcionamiento)
```

### SonarQube

Para ejecutar el servidor de SonarQube, utiliza el siguiente comando npm:

```bash
npm run compose:test
```

Para la primera implementación, utiliza las siguientes credenciales:

- **Usuario**: admin
- **Contraseña**: admin

Cambia la contraseña a `adminadmin` después del primer inicio de sesión.

Después de generar el informe, ve a `localhost:9000` para ver el análisis.

---

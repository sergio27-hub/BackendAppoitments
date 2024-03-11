# BackendAppoitments
Backend this appointemnt server

# REST-FULL-API
Entendido, aquí tienes una descripción más detallada de la API:

### Descripción de la API

La API es un servicio completo diseñado para la gestión de citas de tunning de coches, reservas de servicios de coches, venta de productos relacionados con el tunning y el mantenimiento automotriz, así como la gestión de cuentas de usuario. Proporciona métodos CRUD para interactuar con los datos de citas, reservas, productos y usuarios. Los usuarios pueden utilizar la API para:

1. **Gestión de cuentas de usuario**:
   - Crear cuentas de usuario para acceder a los servicios de la API.
   - Iniciar sesión y cerrar sesión en las cuentas de usuario.

2. **Citas de tunning de coches**:
   - Crear citas para servicios de tunning de coches, como ajustes de motor, instalación de piezas de rendimiento, personalización de carrocería, etc.
   - Detalles como fecha, hora, servicios solicitados, vehículo y más.

3. **Reservas de servicios de coches**:
   - Reservar servicios de mantenimiento y reparación para coches, como cambios de aceite, inspecciones técnicas, reparaciones mecánicas, etc.
   - Especificar detalles como fecha, hora, tipo de servicio, vehículo, etc.

4. **Gestión de productos**:
   - Administrar el inventario de productos relacionados con el tunning y el mantenimiento automotriz.
   - Agregar nuevos productos, actualizar información existente, ver detalles y eliminar productos del inventario.

5. **Leer y actualizar datos**:
   - Recuperar información sobre citas, reservas, productos y usuarios existentes.
   - Actualizar o cancelar citas y reservas según sea necesario, incluidos cambios en fecha, hora, servicios solicitados, etc.
Por supuesto, aquí tienes el punto 6, que trata sobre la asignación de roles para permisos y los dominios de un usuario sobre otros:

6. **Asignación de roles y dominios**:
   - **Roles y permisos**: La API asigna roles a los usuarios para controlar sus permisos de acceso. Los roles pueden incluir administrador, empleado y cliente, cada uno con diferentes niveles de autorización para realizar operaciones CRUD en citas, reservas, productos y cuentas de usuario.
   - **Dominios de usuario**: Los usuarios pueden tener dominios sobre otros usuarios en función de sus roles y relaciones. Por ejemplo, un administrador puede tener acceso y control sobre todos los datos y operaciones en la API, mientras que un empleado puede tener acceso limitado a las operaciones relacionadas con citas, reservas y productos. Los clientes tienen dominio sobre sus propias cuentas y datos relacionados con citas y reservas.

   - La asignación de roles y dominios asegura que los usuarios tengan acceso y autorización adecuados para realizar operaciones específicas dentro de la API, manteniendo la seguridad y la integridad de los datos del sistema.

Con esta funcionalidad, la API puede gestionar eficazmente los roles y permisos de los usuarios, así como sus dominios sobre otros usuarios, garantizando un control granular sobre quién puede acceder y modificar datos específicos en el sistema.

Con estas capacidades, la API ofrece una solución completa para la gestión eficiente de citas, reservas, productos y cuentas de usuario relacionadas con el tunning y el mantenimiento automotriz..

La API está diseñada para ser segura y escalable, utilizando prácticas recomendadas de seguridad como autenticación y autorización para proteger los datos sensibles de los clientes y los detalles de los productos.

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

# Frontend - DevLabs Task Management

Este proyecto es el frontend de una aplicación de gestión de tareas, desarrollado en **React** con **Redux** para el manejo del estado, y **styled-components** para la estilización. La aplicación se conecta a un backend para crear, leer, actualizar y eliminar tareas.

## Características

- Registro y autenticación de usuarios mediante OAuth.
- Creación, visualización, edición y eliminación de tareas.
- Validación de formularios con **React Hook Form** y **Zod**.
- Estilos modernos y responsivos con **styled-components**.
- Manejo del estado global con **Redux**.

## Tecnologías utilizadas

- **React** - Librería para construir interfaces de usuario.
- **Redux** - Para el manejo del estado global.
- **styled-components** - Para la estilización de los componentes.
- **React Hook Form** - Para la gestión y validación de formularios.
- **Axios** - Para las solicitudes HTTP al backend.
- **Zod** (opcional) - Para la validación de datos en el frontend.

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/vlevillar/devlabs-c-frontend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd devlabs-c-frontend
   ```

3. Instala las dependencias utilizando **npm** o **yarn**:

   - Usando npm:

     ```bash
     npm install
     ```

   - Usando yarn:

     ```bash
     yarn install
     ```

## Ejecución

Para ejecutar la aplicación en modo desarrollo, puedes usar el siguiente comando:

- Usando npm:

  ```bash
  npm start
  ```

- Usando yarn:

  ```bash
  yarn start
  ```

Esto abrirá la aplicación en `http://localhost:3000`.

## Variables de entorno
El proyecto consta de variables de entorno para funcionar correctamente en local. Entonces, debemos crear un archivo .env para que funcione correctamente esta es:
**API_URL**: La url del backend, si queremos que funcione con el backend local usaremos `http://localhost:5000` (Normalmente), si queremos que funcione con el backend deployado, usaremos `https://devlabs-c-backend.onrender.com`.

## Uso

1. **Pantalla de inicio**: Al iniciar la aplicación, los usuarios pueden ver sus tareas (si están autenticados). 
   
2. **Agregar tarea**: Los usuarios pueden agregar nuevas tareas usando el formulario en la interfaz.

3. **Validación de formularios**: La aplicación valida el título de la tarea antes de enviarlo al backend. Si el título no es válido o falta, se muestra un mensaje de error.

4. **Interacciones con el backend**: La aplicación hace solicitudes HTTP al backend para crear, obtener, actualizar y eliminar tareas. Asegúrate de que tu backend esté en funcionamiento antes de probar las interacciones.

## Endpoints de la API

### **GET /api/todos?userId=<userId>**

Obtiene todas las tareas de un usuario autenticado.

**Parámetros**:

- `userId`: El ID del usuario (proporcionado por el backend tras la autenticación).

### **POST /api/todos**

Crea una nueva tarea para un usuario autenticado.

**Cuerpo de la solicitud**:

```json
{
  "title": "Descripción de la tarea",
  "userId": "google-oauth2|103697667772800746321"
}
```

### **PUT /api/todos/:id**

Actualiza una tarea existente.

**Cuerpo de la solicitud**:

```json
{
  "title": "Nueva descripción de la tarea"
}
```

### **DELETE /api/todos/:id**

Elimina una tarea.


# API RESTful - Gestión de Pozos Petroleros


## 📋 Descripción del Proyecto

Esta API RESTful permite realizar la gestión integral y el control operacional de **pozos petroleros**. Desarrollada con **Node.js**, **Express.js** y **MongoDB Atlas**, implementa operaciones **CRUD** completas sobre colecciones NoSQL con manejo dinámico de errores, validaciones de entrada y códigos de estado HTTP estandarizados.

---

## Estructura del Proyecto

```text
pozos-petroleros-api/
├── node_modules/                 # dependencias instaladas
├── routes/
│   └── pozos.routes.js          # endpoints de la API
├── src/
│   └── mongodb.js                # conexión a MongoDB
├── .env                         # variables de entorno locales
├── .env.example                 # ejemplo de configuración
├── .gitignore                   # archivos ignorados por Git
├── package-lock.json            # lock de dependencias
├── package.json                 # configuración y scripts
├── pozos.json                   # archivo base con datos de ejemplo
├── README.md                    # documentación del proyecto
├── server.js                    # arranque de la aplicación
└── test/                        # carpeta de pruebas (vacía por ahora)
```

---


## ⚡ Guía de Instalación y Configuración

### 1. Clonar el Repositorio e Instalar Dependencias
```bash
git clone https://github.com/jaracx/pozos-petroleros-api.git
cd pozos-petroleros-api
npm install
```

### 2. Configurar Variables de Entorno
Crear el archivo `.env` basándose en la plantilla `.env.example`:
```bash
cp .env.example .env
```

Editar `.env` e ingresar las credenciales de conexión:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/
DATABASE_NAME=pozos_db
```

### 3. Ejecutar la Aplicación
```bash
npm start

```

---

## 📊 Esquema de Datos del Pozo Petrolero

Cada documento en la colección `pozos` de MongoDB posee la siguiente estructura:

```json
{
    "id": 1,
    "codigo": "PZO-001",
    "nombre": "Pozo Vaca Muerta Alpha",
    "ubicacion": "Añelo, Neuquén",
    "estado": "activo",
    "fechaProduccion": "2021-03-15",
    "barriles_diarios": 1250,
    "profundidad_metros": 2800
  },
```

---

## 🔌 Especificación de Endpoints (API Reference)

| Método | Endpoint | Descripción | Estado Exitoso | Estado Error |
| :--- | :--- | :--- | :---: | :---: |
| **GET** | `/` | Vista de bienvenida (HTML) | `200 OK` | `500` |
| **GET** | `/api/pozos` | Obtener todos los pozos petroleros | `200 OK` | `500` |
| **GET** | `/api/pozos/:codigo` | Buscar pozo por código | `200 OK` | `404` / `500` |
| **POST** | `/api/pozos` | Registrar un nuevo pozo petrolero | `201 Created` | `400` / `500` |
| **PUT** | `/api/pozos/:codigo` | Actualizar datos de un pozo existente por código | `200 OK` | `400` / `404` / `500` |
| **DELETE** | `/api/pozos/:codigo` | Eliminar un pozo por código | `200 OK` | `404` / `500` |

---

## 📝 Ejemplos de Peticiones y Respuestas

### 1. `GET /api/pozos/PZO-001` (Búsqueda por código existente)
**Respuesta (`200 OK`):**
```json
{
  "id": 1,
  "codigo": "PZO-001",
  "nombre": "Pozo Vaca Muerta Alpha",
  "ubicacion": "Añelo, Neuquén",
  "estado": "activo",
  "fechaProduccion": "2021-03-15",
  "barriles_diarios": 1250,
  "profundidad_metros": 2800
}
```

### 2. `GET /api/pozos/NOEXISTE` (Código inexistente - Mensaje informativo)
**Respuesta (`404 Not Found`):**
```json
{
  "error": "No se encontró ningún pozo con el código: NOEXISTE"
}
```

### 3. `POST /api/pozos` (Crear Pozo)
**Body (`application/json`):**
```json
{
  "codigo": "PZO-004",
  "nombre": "Pozo Cerro Dragón Norte",
  "ubicacion": "Cerro Dragón, Santa Cruz",
  "estado": "activo",
  "fechaProduccion": "2024-02-10",
  "barriles_diarios": 980,
  "profundidad_metros": 2650
}
```
**Respuesta (`201 Created`):**
```json
{
  "mensaje": "Pozo registrado con éxito",
  "pozo": {
    "id": 4,
    "codigo": "PZO-004",
    "nombre": "Pozo Cerro Dragón Norte",
    "ubicacion": "Cerro Dragón, Santa Cruz",
    "estado": "activo",
    "fechaProduccion": "2024-02-10",
    "barriles_diarios": 980,
    "profundidad_metros": 2650
  }
}
```

### 4. `PUT /api/pozos/PZO-002` (Actualizar Pozo)
**Body (`application/json`):**
```json
{
  "estado": "mantenimiento",
  "barriles_diarios": 0
}
```
**Respuesta (`200 OK`):**
```json
{
  "mensaje": "Pozo PZO-002 actualizado correctamente",
  "actualizacion": {
    "id": 2,
    "codigo": "PZO-002",
    "nombre": "Pozo Loma Campana West",
    "ubicacion": "Loma Campana, Neuquén",
    "estado": "mantenimiento",
    "fechaProduccion": "2020-08-20",
    "barriles_diarios": 0,
    "profundidad_metros": 3100
  }
}
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para construcción de APIs RESTful.
- **MongoDB Atlas**: Base de datos NoSQL alojada en la nube.
- **MongoDB Node.js Driver**: Conexión y operaciones sobre la colección `pozos`.
- **Dotenv**: Gestión segura de variables de entorno.



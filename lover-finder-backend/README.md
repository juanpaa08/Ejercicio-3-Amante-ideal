# Lover Finder Backend

REST API para registrar perfiles de posibles parejas románticas y buscar candidatos por interés compartido.

## Arquitectura

El proyecto sigue una **arquitectura por capas** (Layered Architecture):

```
src/
├── config/          # Configuración de base de datos
├── models/          # Esquemas de Mongoose (capa de datos)
├── dtos/            # Data Transfer Objects — validación de entrada
├── repositories/    # Capa de acceso a datos (solo consultas a MongoDB)
├── services/        # Capa de lógica de negocio
├── controllers/     # Manejo de peticiones/respuestas HTTP
├── routes/          # Definición de rutas Express
├── seed.js          # Datos iniciales de ejemplo
└── index.js         # Punto de entrada de la aplicación
```

### Responsabilidad de cada capa

| Capa | Responsabilidad |
|------|----------------|
| **Models** | Define la estructura de datos con Mongoose (esquemas y validaciones a nivel BD) |
| **DTOs** | Valida y sanitiza los datos de entrada antes de llegar a la lógica de negocio |
| **Repositories** | Ejecuta las consultas a MongoDB — única capa que habla con la base de datos |
| **Services** | Contiene la lógica de negocio, orquesta DTOs y repositorios |
| **Controllers** | Recibe peticiones HTTP, delega al servicio, y retorna respuestas con códigos adecuados |
| **Routes** | Mapea URLs a controladores |

### ¿Por qué esta arquitectura?

- **Separación de responsabilidades**: cada capa tiene una función clara.
- **Testabilidad**: cada capa puede probarse de forma aislada.
- **Mantenibilidad**: agregar nuevas funcionalidades es sencillo — solo se agregan archivos en la capa correspondiente.
- **Escalabilidad**: la estructura facilita la migración a microservicios si se necesitara en un futuro.

## Requisitos previos

- **Node.js** v18 o superior
- **MongoDB** corriendo localmente en `mongodb://localhost:27017`

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd lover-finder-backend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo (con hot-reload)
npm run dev

# Ejecutar en producción
npm start
```

El servidor se levantará en `http://localhost:3000` por defecto.

Al iniciar, si la colección está vacía, se insertarán **5 perfiles de ejemplo** automáticamente.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/lover-finder` |

## Endpoints

### `POST /amantes` — Crear un perfil

**Request Body:**
```json
{
  "nombre": "Carlos López",
  "edad": 28,
  "intereses": ["música", "viajes", "cocina"]
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "...",
  "nombre": "Carlos López",
  "edad": 28,
  "intereses": ["música", "viajes", "cocina"],
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Respuesta con error de validación (400):**
```json
{
  "errors": [
    "El campo \"edad\" debe ser un número entero mayor o igual a 18."
  ]
}
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/amantes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Torres","edad":25,"intereses":["lectura","cine"]}'
```

**Ejemplo con fetch:**
```javascript
const res = await fetch('http://localhost:3000/amantes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Ana Torres',
    edad: 25,
    intereses: ['lectura', 'cine'],
  }),
});
const data = await res.json();
```

---

### `GET /amantes?interes=x` — Buscar perfiles por interés

**Parámetros de consulta:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `interes` | string | Sí | El interés a buscar |

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "...",
    "nombre": "Carlos López",
    "edad": 28,
    "intereses": ["música", "viajes", "cocina"]
  }
]
```

**Ejemplo con curl:**
```bash
curl "http://localhost:3000/amantes?interes=música"
```

**Ejemplo con fetch:**
```javascript
const res = await fetch('http://localhost:3000/amantes?interes=música');
const data = await res.json();
```

## Datos semilla

Al iniciar el servidor, si la colección `amantes` está vacía, se insertan los siguientes perfiles:

| Nombre | Edad | Intereses |
|--------|------|-----------|
| Carlos López | 28 | música, viajes, cocina |
| María García | 24 | lectura, yoga, música |
| Andrés Martínez | 32 | deportes, tecnología, viajes |
| Lucía Fernández | 21 | arte, fotografía, cocina |
| Diego Ramírez | 26 | música, deportes, videojuegos |

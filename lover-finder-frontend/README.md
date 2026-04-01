# Lover Finder Frontend

Interfaz web para la aplicación Lover Finder — permite crear perfiles de posibles parejas y buscar candidatos por interés compartido.

## Tecnologías

- **React** (con Vite)
- **CSS** puro (sin frameworks CSS)
- **fetch** para llamadas HTTP

## Requisitos previos

- **Node.js** v18 o superior
- El **backend** (`lover-finder-backend`) debe estar corriendo en `http://localhost:3000`

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd lover-finder-frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|------------|-------------------|
| `VITE_API_URL` | URL base del backend | `http://localhost:3000` |

## Conexión con el backend

1. Asegúrate de tener MongoDB corriendo localmente.
2. Inicia el backend:
   ```bash
   cd ../lover-finder-backend
   npm install
   npm run dev
   ```
3. Inicia el frontend:
   ```bash
   cd ../lover-finder-frontend
   npm run dev
   ```

## Funcionalidades

### Crear Perfil
Formulario con campos para **nombre**, **edad** e **intereses** (separados por coma). Al enviar, se llama a `POST /amantes` en el backend.

### Buscar por Interés
Campo de texto + botón de búsqueda. Llama a `GET /amantes?interes=x` y muestra los perfiles como tarjetas.

### Manejo de errores
Los errores de validación del backend se muestran directamente al usuario en la interfaz.

## Estructura del proyecto

```
src/
├── components/
│   ├── CreateProfileForm.jsx / .css
│   ├── SearchByInterest.jsx / .css
│   └── ProfileCard.jsx / .css
├── services/
│   └── api.js
├── App.jsx
├── App.css
└── main.jsx
```

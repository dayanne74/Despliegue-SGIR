# 🌍 Agencia de Turismo - Sistema de Reservas

Una aplicación web para una agencia de turismo que permite a los usuarios explorar destinos por Colombia y realizar reservas de manera intuitiva y segura.

## 📋 Descripción

Este proyecto es una plataforma web  desarrollada para una agencia de turismo, donde los usuarios pueden:
- Explorar diferentes destinos turísticos
- Ver detalles de paquetes turísticos
- Realizar reservas en línea
- Gestionar sus reservas

## 🚀 Tecnologías Utilizadas

### Frontend
- **React.js** - Biblioteca de JavaScript para la interfaz de usuario
- **CSS3** - Estilos y diseño responsivo
- **JavaScript ES6+** - Lógica del lado del cliente

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **API RESTful** - Arquitectura de servicios web

### Base de Datos
- **MongoDB**
- Gestión de datos de usuarios, destinos y reservas

## 📁 Estructura del Proyecto

```
agencia-turismo/
├── client/                 # Aplicación React (Frontend)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios para API calls
│   │   ├── styles/        # Archivos CSS
│   │   └── App.js         # Componente principal
│   ├── public/
│   └── package.json
├── server/                # API Backend (Node.js)
│   ├── controllers/       # Controladores de rutas
│   ├── models/           # Modelos de datos
│   ├── routes/           # Definición de rutas
│   ├── config/           # Configuración de BD
│   └── server.js         # Archivo principal del servidor
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- npm 
- MongoDB instalado y corriendo

2. **Instalar dependencias del backend**
```bash
cd Poyecto-Sgir
cd API
npm install
```

3. **Instalar dependencias del frontend**
```bash
cd Poyecto-Sgir
cd react
Cd react
npm install
```

## 🚀 Ejecución del Proyecto

### Iniciar el servidor backend (API)
```bash
cd Poyecto-Sgir
cd API
npm run start
```
El servidor se ejecutará en `http://localhost:5000`

### Iniciar la aplicación React
```bash
cd Poyecto-Sgir
cd react
Cd react
npm run dev
```
La aplicación se abrirá en `http://localhost:5000`

## 📱 Funcionalidades

### Para Usuarios
- ✅ **Explorar destinos**: Navegar por diferentes paquetes turísticos
- ✅ **Detalles de paquetes**: Ver información completa de cada destino
- ✅ **Sistema de reservas**: Realizar reservas de forma segura
- ✅ **Gestión de reservas**: Ver y administrar reservas realizadas
- ✅ **Diseño responsivo**: Compatible con dispositivos móviles

### Para Administradores *(si aplica)*
- ✅ **Gestión de destinos**: Agregar, editar y eliminar paquetes
- ✅ **Gestión de reservas**: Administrar todas las reservas
- ✅ **Dashboard**: Panel de control con estadísticas

## 🌐 API Endpoints

### Destinos
```
GET    /api/destinos          # Obtener todos los destinos
GET    /api/destinos/:id      # Obtener un destino específico
POST   /api/destinos          # Crear nuevo destino (admin)
PUT    /api/destinos/:id      # Actualizar destino (admin)
DELETE /api/destinos/:id      # Eliminar destino (admin)
```

### Reservas
```
GET    /api/reservas          # Obtener todas las reservas
GET    /api/reservas/:id      # Obtener una reserva específica
POST   /api/reservas          # Crear nueva reserva
PUT    /api/reservas/:id      # Actualizar reserva
DELETE /api/reservas/:id      # Cancelar reserva
```

### Usuarios *(si aplica)*
```
POST   /api/auth/register     # Registro de usuario
POST   /api/auth/login        # Inicio de sesión
```

## 📸 Capturas de Pantalla

### Página Principal
![Página Principal](screenshots/home.png)

### Detalles del Destino
![Detalles del Destino](screenshots/destino-detalle.png)

### Formulario de Reserva
![Formulario de Reserva](screenshots/reserva-form.png)

### Dashboard de Reservas
![Dashboard](screenshots/dashboard.png)

### Backend
- `npm run start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con nodemon
- `npm run test` - Ejecutar tests

### Frontend
- `npm run dev` - Iniciar aplicación en desarrollo
- `npm run build` - Construir aplicación para producción
- `npm run preview` - Previsualizar build de producción



## 👨‍💻 Autor

**Dayanne Moque**
- Email: dayanne.moque@soy.sena.edu.co


import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // ⚠️ Cargar variables de entorno desde .env

// Importaciones de rutas
import comidaRoutes from "./routes/comidas.js";
import contactosRoutes from "./routes/contactos.js";
import paqueteRoutes from "./routes/paquete.js";
import adminRoutes from "./routes/admins.js";
import hotelesRoutes from "./routes/hotels.js";
import comentarioRoutes from "./routes/comentarios.js";
import excursionesRoutes from "./routes/excursiones.js";
import autentificacionesRoutes from "./routes/autenticación_routes.js";
import clientesRoutes from "./routes/usuarios.js";
import transporteRoutes from "./routes/transportes.js";
import actividadRoutes from "./routes/actividades.js";
import reservasRoutes from "./routes/reservas.js";

// Configuración
import connectDB from "./config/config.js";
import { crearRolesPredeterminados } from "./config/createRoles.js";
import { crearadminPredeterminado } from "./config/crearAdminPredeterminado.js";
import swaggerJSDOCs from "./swaggerConfig.js";
import errorHandler from './middleware/errorHandler.js';
import multer from "multer";

// Inicialización
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer (para imágenes)
const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));
const upload = multer({ dest: uploadsDir });

// Verificación de imágenes disponibles
console.log("🗂️ Sirviendo imágenes desde:", uploadsDir);
try {
  console.log("📂 Contenido de uploads:", fs.readdirSync(uploadsDir));
} catch (err) {
  console.error("❌ No se puede acceder a uploads:", err.message);
}

// Middleware global
app.use(cors({
  origin: 'http://localhost:5173', // Ajusta esto en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar roles y admin por defecto
crearRolesPredeterminados();
crearadminPredeterminado();

// Rutas de API
app.use("/api", comidaRoutes);
app.use("/api/autentificaciones", autentificacionesRoutes);
app.use("/api/hoteles", hotelesRoutes);
app.use("/api/excursiones", excursionesRoutes);
app.use("/api/paquetes", paqueteRoutes);
app.use("/api", adminRoutes);
app.use("/api", comentarioRoutes);
app.use("/api", clientesRoutes);
app.use("/api", contactosRoutes);
app.use("/api", transporteRoutes);
app.use("/api", actividadRoutes);
app.use("/api/reservas", reservasRoutes);

// Endpoint de carga de imagen para hoteles
app.post("/hotels", upload.single("image"), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file;
  res.json({
    message: "Hotel agregado exitosamente",
    hotelData: { name, description, price, image }
  });
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API de SGIR</h1>");
});

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto y servidor
const port = process.env.PORT || 5000;

const iniciarServidor = async () => {
  try {
    await connectDB(); // Conexión MongoDB usando variable del .env
    await crearRolesPredeterminados();
    await crearadminPredeterminado();
    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${port}`);
      swaggerJSDOCs(app, port);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();

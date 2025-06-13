import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Configurar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// 📂 Cargar rutas
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

// ⚙️ Configuración inicial
import { crearRolesPredeterminados } from "./config/createRoles.js";
import { crearadminPredeterminado } from "./config/crearAdminPredeterminado.js";
import swaggerJSDOCs from "./swaggerConfig.js";
import errorHandler from "./middleware/errorHandler.js";
import multer from "multer";

// ⛑️ Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Configuración de imágenes con multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));
const upload = multer({ dest: uploadsDir });

console.log("📁 Sirviendo imágenes desde:", uploadsDir);
try {
  console.log("📷 Archivos disponibles:", fs.readdirSync(uploadsDir));
} catch (err) {
  console.error("❌ No se puede acceder a la carpeta de imágenes:", err.message);
}

// 📦 Rutas de API
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

// 📤 Endpoint de carga de imagen para hoteles (puedes moverlo a un controlador)
app.post("/hotels", upload.single("image"), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file;
  res.json({
    message: "Hotel agregado exitosamente",
    hotelData: { name, description, price, image }
  });
});

// 🏠 Ruta raíz
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API de SGIR</h1>");
});

// 🛡️ Middleware de errores
app.use(errorHandler);

// 🚀 Inicialización del servidor
const iniciarServidor = async () => {
  try {
    console.log("⏳ Conectando a MongoDB...");
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Conectado a MongoDB");

    await crearRolesPredeterminados();
    await crearadminPredeterminado();

    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${port}`);
      swaggerJSDOCs(app, port);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

iniciarServidor();

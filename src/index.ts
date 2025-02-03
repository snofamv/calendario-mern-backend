import express from "express";
import cors from "cors";
import morgan from "morgan";
import calendarRoutes from "./routes/calendar.routes";
import authRoutes from "./routes/auth.routes";
import { runDB } from "./database/config";
import "dotenv/config"; // ✅ Carga variables de entorno automáticamente

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Conectar a la base de datos
runDB();

// Rutas
app.use("/api/calendar", calendarRoutes);
app.use("/api/auth", authRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
});

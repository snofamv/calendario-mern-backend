import mongoose from "mongoose";
import "dotenv/config"; // ✅ Carga variables de entorno automáticamente

const uri = process.env.DB_CONN || "";

if (!uri) {
  throw new Error("DB_CONN no está definido en las variables de entorno.");
}

export const runDB = async () => {
  try {
    await mongoose.connect(uri, {
      autoIndex: true, // Crea índices automáticamente
    });

    console.log("✅ Conectado a MongoDB exitosamente.");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw new Error("Error al conectar a MongoDB.");
  }
};

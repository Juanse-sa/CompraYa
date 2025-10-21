import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./src/routes/product.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import sequelize from "./src/config/db.js";

dotenv.config();
const app = express();

// === Middlewares ===
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads")); // Servir imágenes estáticas
app.use("/api/orders", orderRoutes);


// === Rutas ===
app.use("/api/catalog", productRoutes);

// === Inicialización del servidor ===
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos MySQL correctamente");

    await sequelize.sync({ alter: true });
    console.log("🗃️  Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`🟢 Catalog Service corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar a MySQL o iniciar servidor:", error.message);
    process.exit(1);
  }
};

startServer();

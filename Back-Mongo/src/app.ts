import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import db from './config/mongo';

// Rutas
import eventoRoutes from './routes/evento-routes';
import personaRoutes from './routes/persona-routes';
import areaInteresRoutes from './routes/area-interes-routes';
import ciudadRoutes from './routes/ciudad-routes';
import cargoRoutes from './routes/cargo-routes';
import authRoutes from './routes/authRoutes'; // Login y registro

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    // Conexión a la base de datos
    db()
      .then(() => {
        console.log("✅ Conexión exitosa a la base de datos!");
      })
      .catch((err) => {
        console.error("❌ Error en la conexión a la base de datos:", err);
      });

    // Configuración del puerto
    this.app.set("port", 3000);

    // Middlewares
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use("/api/eventos", eventoRoutes);
    this.app.use("/api/personas", personaRoutes);
    this.app.use("/api/areas", areaInteresRoutes);
    this.app.use("/api/ciudades", ciudadRoutes); // ✅ Ruta correcta
    this.app.use("/api/cargos", cargoRoutes);
    this.app.use("/api/auth", authRoutes); // ✅ Ruta de login y registro
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('🚀 Servidor corriendo en el puerto', this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();

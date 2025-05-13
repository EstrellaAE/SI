import { connect } from "mongoose";

const DB_URI= 'mongodb://127.0.0.1:27017/EventosBD';

async function dbConnect(): Promise<void> {
    try {
        await connect(DB_URI);
        console.log("¡Conexión exitosa a la base de datos!");
    } catch (error) {
        console.error("Error al conectar a la base de datos: ", error);
    }
};

export default dbConnect;
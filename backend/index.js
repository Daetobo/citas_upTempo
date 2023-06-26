import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'

const app = express();

// Leer datos en json
app.use(express.json());

// configuración para utilizar variables de entorno
dotenv.config();

// conectar a la base de datos
connectDB();

// ================================ ROUTING ================================

app.use('/api/usuarios',usuarioRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
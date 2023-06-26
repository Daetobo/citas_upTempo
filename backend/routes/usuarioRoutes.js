import express from 'express';
import { registrar,
        autenticar,
        confirmar,
} from '../controller/usuarioController.js';

const router = express.Router();

// Autenticación, registro y confirmación de usuario
router.post('/',registrar); // crear nuevo usuario
router.post('/login',autenticar); // Autenticar user
router.get('/confirmar/:token',confirmar)

export default router;
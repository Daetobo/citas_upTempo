import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {
    
    const { email } = req.body;

    const usuarioExiste = await Usuario.findOne({email});
    // Evitar usuario duplicados
    if (usuarioExiste) {
        const error = new Error('Usuario ya se encuentra registrado');
        return res.status(400).json({msg:error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json({msg: "Usuario Creado Correctamente"})
    } catch (error) {
        console.log(error);
    }

}

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});

    if (!usuario) {
        const error = new Error('Usuario no Registrado');
        return res.status(400).json({msg: error.message});
    }

    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg:error.message})
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    } else {
        const error = new Error('Contraseña Incorrecta')
        return res.status(403).json({msg:error.message})
    }
}

const confirmar = async (req,res) => {
    const { token } = req.params;
    const userConfirmado = await Usuario.findOne({ token });

    if (!userConfirmado) {
        const error = new Error('Token no Válido')
        return res.status(403).json({msg: error.message})
    }

    try {
        userConfirmado.confirmado = true;
        userConfirmado.token = '';
        await userConfirmado.save();
        res.json({msg:"Usuario confirmado Correctamente"})
    } catch (error) {
        console.log(error)
    }
}

export{
    registrar,
    autenticar,
    confirmar,
}
const jwt = require('jsonwebtoken');

module.exports = (req, res, nex) =>{

    /**leer el token */
    const token = req.headers["x-auth-token"];
    /**revisar si hay token */
    if(!token){
        return res.status(400).json({message:"No se encontro un token"});
    }

    /**validar token */
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {
        res.status(400).json({message:"Token no es valido"})        
    }

}
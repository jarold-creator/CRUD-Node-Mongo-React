/**importar el modelo en la variable Cliente*/
const Cliente = require('../models/Cliente');

//**buscar clientes por id */
exports.buscarClientePorId = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).json({ msg: "cliente no encontrado con este id" });
        } else {
            res.json({cliente});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al buscar un cliente' });
    }
}

/**buscar clientes */
exports.buscarClientes = async (req, res) => {
    try {
        const cliente = await Cliente.find();
        res.json({cliente});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error buscar cliente buscarCliente()');
    }
}

/**Funcion agregar cliente */
exports.agregarClientes = async (req, res) => {
    try {
        let clientes;
        clientes = new Cliente(req.body);
        await clientes.save();
        res.json({message:"cliente agregado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error agregar cliente agregarCliente()' });
    }
}

/**funcion eliminar cliente por Id */
exports.eliminarClientePorId = async (req, res) => {
    try {
        /**validamos si el cliente existe */
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).json({ msg: 'No se encontro el cliente por Id' });
        } else {
            await Cliente.findOneAndDelete({ _id: req.params.id })
            res.json({ msg: "Cliente eliminado" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al eliminar cliente');
    }
}

exports.actualizarCliente = async(req, res)=>{
    try {
        const{
            nombres,
            apellidos,
            documento,
            correo,
            telefono,
            direccion
        }  = req.body;
        let cliente = await Cliente.findById(req.params.id);   
        if(!cliente){
            res.status(404).json({msg:"Cliente no existe"})
        }else{
            cliente.nombres = nombres;
            cliente.apellidos = apellidos;
            cliente.documento = documento;
            cliente.correo = correo;
            cliente.telefono = telefono;
            cliente.direccion = direccion;

            cliente = await Cliente.findOneAndUpdate({ _id: req.params.id }, cliente, {new:true});
            res.json({message:"cliente actualizado"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al actualizar un cliente');        
    }
}
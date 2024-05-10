const Producto = require('../models/Producto')

//agregar productos
exports.agregarProducto = async(req, res)=>{
    try {
        let productos;
        productos = new Producto(req.body);
        await productos.save();
        res.json({message:"producto agregado"});
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al agregar productos' });
    }
}

//buscar un producto *busca todos*
exports.buscarProducto = async(req, res)=>{
    try {
        const productos = await Producto.find();
        res.json({productos});        
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al buscar productos metodo buscarProducto()' });        
    }
}

//buscar producto por id
exports.buscarProductoPorId = async(req, res)=>{
    try {
        let productos = await Producto.findById(req.params.id);
        if(!productos){
            res.status(404).json({msg:"No se encontro el producto para este id"})
        }else{
            res.json(productos);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Error al buscar el producto"})        
    }
}

//funcion actualizar producto
exports.actualizarProducto = async(req, res)=>{
    try {
        const{
            nombre,
            presentacion,
            marca,
            fechaVence,
            cantidad,
            precio
        }  = req.body;  
        let productos = await Producto.findById(req.params.id);
        if(!productos){
            res.status(500).json({msg:"no se encontro el producto por id"})
        }else{
            productos.nombre = nombre;
            productos.presentacion = presentacion;
            productos.marca = marca;
            productos.fechaVence = fechaVence;
            productos.cantidad = cantidad;
            productos.precio = precio;

            productos = await Producto.findOneAndUpdate({ _id: req.params.id }, productos, {new:true});
            res.json(productos);
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al actualizar un producto');           
    }
}

//eliminar cliente por id
exports.eliminarClientePorId = async(req, res)=>{
    try {
        /**validamos si el cliente existe */
        let productos = await Producto.findById(req.params.id);
        if (!productos) {
            res.status(404).json({ msg: 'No se encontro el cliente por Id' });
        } else {
            await Producto.findOneAndDelete({ _id: req.params.id })
            res.json({ msg: "producto eliminado" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al eliminar cliente');
    }
}
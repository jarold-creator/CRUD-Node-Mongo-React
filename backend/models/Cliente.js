const mongoose = require('mongoose')

/**Modelo = al de la base de datos */
const clientesSchema = mongoose.Schema({
    nombres:{
        type:String,
        require: true
    },
    apellidos:{
        type:String,
        require: true
    },
    documento:{
        type:Number,
        require: true
    },
    correo:{
        type:String,
        require: true
    },
    telefono:{
        type:Number,
        require: true
    },
    direccion:{
        type:String,
        require: true
    }
},{versionKey:false});

/**exportar el modelo */
module.exports = mongoose.model('Cliente', clientesSchema);
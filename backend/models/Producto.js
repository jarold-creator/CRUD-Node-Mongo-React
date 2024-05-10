const mongoose = require('mongoose')

const productosSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    presentacion:{
        type: String,
        require: true
    },
    marca:{
        type:String,
        require:true
    },
    fechaVence:{
        type:String,
        require:true
    },
    cantidad:{
        type: Number,
        require: true        
    },
    precio:{
        type:Number,
        require:true
    }

},{versionKey:false})

module.exports = mongoose.model('Producto', productosSchema);
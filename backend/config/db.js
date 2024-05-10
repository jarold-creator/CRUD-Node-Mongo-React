/**importar modulo mongoose */
const mongoose = require('mongoose');

/**variable de entorno */
require('dotenv').config({ path:".env" });

/**conectar a la DB */
const connDB = () =>{    
    mongoose
    .connect(process.env.DB_MONGO)
    .then(()=>{
        console.log('Connetion MongoDB OK')
    })
    .catch((err)=>{
        console.log(err);
    })  
}

module.exports = connDB;
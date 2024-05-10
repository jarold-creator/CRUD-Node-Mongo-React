const express = require('express');
const cors = require('cors')
const connDB = require('../config/db')

/**creamos el servidor */
const app = express();
/**conectar a la base de datos */
connDB();
/**habilitar los cors */
app.use(cors());
/**habilitar el json */
app.use(express.json());

const PORT =  process.env.PORT || 4000

/**rutas de los modulos */
app.use("/api/usuarios", require("../routers/usuarios"));
app.use("/api/auth", require("../routers/auth"));
app.use("/api/clientes", require("../routers/rutasCliente"));
app.use("/api/productos", require("../routers/rutasProducto"))



app.listen(PORT,()=>{
    console.log('servidor iniciado ')
})
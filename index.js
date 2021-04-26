const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// console.log( process.env );


// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// Cors
app.use(cors());

// Directorio Publico
app.use( express.static('public') );

// Lectura y paseo del BODY
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/authRouter'));

// TODO: CRUD: eventos




// Escuchar Peticiones
app.listen( process.env.PORT , () => {
    console.log(`Server running on port ${ process.env.PORT }`)
})


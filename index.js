const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


const app = express();

dbConnection();

//CORS
app.use(cors())

app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

app.use('/api/auth', require('./Routes/auth'));

app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${ process.env.PORT}`);
});
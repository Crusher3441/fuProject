const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/db')
const cors = require('cors');
const bodyParser = require('body-parser')
const ImageRoutes = require('./Routes/ImageRoutes')
app.get('/',(req,res)=>{
    res.send('image gallery server')
})

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/images', ImageRoutes);

app.listen(PORT,()=>{
    console.log(`everything is ok at port ${PORT}`)
})
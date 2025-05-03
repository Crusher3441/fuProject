const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL).then(()=>{
    console.log("Mongo DB is conected");
}).catch((err)=>{
    console.log("Error while connecting to DB: ",err);
})


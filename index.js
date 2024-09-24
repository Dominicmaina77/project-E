const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// define routes
const userRoute = require ('./routes/userRoute');
const productRoute = require ('./routes/productRoute');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: './.env'
    });
}

const port = process.env.PORT;
const dbconnection= "mongodb+srv://mainadominic628:Dominic77.@clustereapp.50ogx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterEapp";
// const dbconnection= process.env.MONGOURL;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.listen(port,(req,res) => {
    console.log(`Server is running on port ${port}`);
    console.log(`database url is ${dbconnection}`);
});

app.get('/',(req,res)=>{
    res.send('Server Online');
})

// connect to database
mongoose.connect(dbconnection,{useNewUrlParser:true,useUnifiedTopology:true})
   .then(() => console.log("Connected to MongoDB"))
   .catch(err => console.error('Error connecting to MongoDB',err));

//    create api routes
 app.use('/api/users',userRoute);
 app.use('/api/products',productRoute);
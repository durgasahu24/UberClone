const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js")
const cors = require('cors');


connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.send("Hello World :");
})


app.use('/users',userRoutes);



module.exports = app;

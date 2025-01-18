const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const captainRoutes = require("./routes/captain.routes.js")
const mapRoutes = require("./routes/map.routes.js")
const rideRoutes = require("./routes/ride.routes.js")


connectToDb();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send("Hello World :");
})

console.log("welecome to app ")


app.use('/users', userRoutes);
app.use('/captain', captainRoutes)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)



module.exports = app;

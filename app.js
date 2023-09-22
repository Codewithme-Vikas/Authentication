const express = require("express");
const cookieParser = require("cookie-parser")


const app = express();


// enviromental variables
require("dotenv").config();
const PORT = process.env.PORT || 4000;


// middlewares
app.use( express.json() );
app.use( cookieParser() );

// database connection
const mongodbConnect = require("./config/database");
mongodbConnect();


// API routes
const userRouter = require("./routes/user");
app.use("/api/v1" , userRouter )




// Run on the server
app.listen( PORT , ()=>{
    console.log(`API is running at http://localhost:${PORT}`);
})
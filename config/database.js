const mongoose = require("mongoose")
require("dotenv").config()

const mongodbConnect = ()=>{
    mongoose.connect( process.env.MONGO_URL )
        .then( res => console.log("successfully connected to server."))
        .catch( err => {
            console.log( err )
            console.log("data base is not connected!")
            process.exit(1)  
        })
}

module.exports = mongodbConnect;
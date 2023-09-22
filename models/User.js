const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name  : { type : String , required : true , trim : true  },
    email : { type : String , required : true , trim : true  },
    password : { type : String , required : true },
    role : { 
        type : String ,
        enum : [ 'Admin' , 'Student' , 'Visitor' ],  // role value can only be from this array only
    }
},{
    timestamps :  true
});


const User = mongoose.model("User" , userSchema );


module.exports = User;
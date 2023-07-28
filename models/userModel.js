const mongoose = require("mongoose")

const userScheema = mongoose.Schema({
    userName: {
        type:String,
        required: [true, "Username is required"],
        unique: [true, "This username is already in use"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    email:{
        type:String,
        required:[true, "Email is mandatory"],
        unique:[true, "This email is already in use"]
    },
    groups:[{
        type:mongoose.Types.ObjectId,
        ref: "Group" 
    }],
    tasks:[{
        type:mongoose.Types.ObjectId,
        ref: "Task"
    }]
}, {timeStamp:true})

module.exports = mongoose.model("User", userScheema);
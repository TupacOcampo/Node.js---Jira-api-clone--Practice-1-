const mongoose = require("mongoose");

const groupScheema = mongoose.Schema({
    groupName:{
        type:String,
        required:[true, "Group name is mandatory"]
    },
    groupDescription: {
        type:String,
        required:[true, "Description is mandatory"]
    }
},{timeStamp:true});

module.exports = mongoose.model("Group", groupScheema);
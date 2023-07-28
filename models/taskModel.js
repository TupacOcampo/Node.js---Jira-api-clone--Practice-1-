const mongoose = require ("mongoose");

const taskScheema = mongoose.Schema({
    taskName: {
        type:String,
        required: [true, "Task name is a mandatory field"]
    },
    taskDescription: {
        type: String,
        required: [true, "Task description is a mandatory field"],
    },
    group:{
        type:mongoose.Types.ObjectId,
        ref:"Group"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
}, {timeStamp: true});

module.exports = mongoose.model("Task", taskScheema);


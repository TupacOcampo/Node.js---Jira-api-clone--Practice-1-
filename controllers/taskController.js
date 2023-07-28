const asyncHandler = require ("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const Group = require("../models/groupModel");

const getAllTasks = asyncHandler (async(req, res) => {
    const tasks = await Task.find().populate("group");
    res.status(200).json(tasks);
});

const getTaskById = asyncHandler (async(req, res) => {
    const foundTask = await Task.findById(req.params.id).populate("group");
    if (!foundTask){
        res.status(404);
        throw new Error("Task does not exist.");
    }
    res.status(200).json(foundTask);
})

const deleteTask = asyncHandler (async(req, res)=>{
     const deletedTask = await Task.findByIdAndDelete(req.params.id);
     if (!deleteTask){
        res.status(404);
        throw new Error("This task does not exist!");
     }
     res.status(200).json({message:"Task deleted"});
});

const assignTaskToUser = asyncHandler (async(req, res) => {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask){
        res.status(404);
        throw new Error("This task does not exist!");
    }
    
    const {userId} = req.body;
    const foundUser = await User.findById(userId);
    if (!foundUser){
        res.status(404);
        throw new Error("This user does not exist!");
    }

    foundTask.user = foundUser;
    foundUser.tasks.push(foundTask);

    await Task.findByIdAndUpdate(foundTask.id, {user:foundTask.user});
    await User.findByIdAndUpdate(foundUser.id, {tasks:foundUser.tasks});

    res.status(200).json(await Task.findById(req.params.id).populate("user").populate("group"))
});

module.exports = { getAllTasks, getTaskById, deleteTask, assignTaskToUser }
const asyncHandler = require ("express-async-handler");
const Task = require("../models/taskModel");

const getAllTasks = asyncHandler (async(req, res) => {
    const tasks = await Task.find().populate("group");
    res.status(200).json(tasks);
});

const createNewTask = asyncHandler (async (req, res) => {
    const { taskName, taskDescription } = req.body;

    if (!taskName || !taskDescription){
        res.status(400);
        throw new Error("Parameters required!");
    }

    const addedTask = await Task.create({taskName, taskDescription});
    res.status(201).json(addedTask);
});

const deleteTask = asyncHandler (async(req, res)=>{
     const deletedTask = await Task.findByIdAndDelete(req.params.id);
     if (!deleteTask){
        res.status(404);
        throw new Error("This task does not exist!");
     }
     res.status(200).json({message:"Task deleted"});
});

module.exports = { getAllTasks, createNewTask, deleteTask }
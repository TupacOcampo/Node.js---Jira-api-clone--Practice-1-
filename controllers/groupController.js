const asyncHandler = require("express-async-handler");
const Group = require("../models/groupModel");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Get all groups ---------------------------------------------------------------
const getGroups = asyncHandler( async ( req, res) => {
    const groups = await Group.find().populate("tasks").populate("users");
    res.status(200).json(groups);
});

const getGroupById = asyncHandler( async(req, res) => {
    const foundGroup = await Group.findById(req.params.id).populate("tasks");
    if (!foundGroup){
        res.status(404);
        throw new Error("Group does not exist");
    }
    res.status(200).json(foundGroup);
})

//Create new group -------------------------------------------------------------
const addGroup = asyncHandler (async(req, res) => {
    const {groupName, groupDescription} = req.body;

    if (!groupName || !groupDescription){
        res.status(404).end("All fields are mandatory");
        throw new Error("There was an error :(");
    }
    else{
        if (await Group.findOne({groupName})){
            res.status(404).end("This group name is already in use.");
            throw new Error("There was an error :(");
        };
    }

    const addedGroup = await Group.create({groupName, groupDescription});
    res.status(201).json(addedGroup);
});

//Delete group -------------------------------------------------------------------
const deleteGroup = asyncHandler(async(req, res) => {
    const foundGroup = await Group.findByIdAndDelete (req.params.id);

    if (!foundGroup){
        res.status(404).json({message:"Group does not exists"});
        throw new Error("This group does not exist")
    }

    res.status(200).json(foundGroup);
});

const addTask = asyncHandler (async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group){
        res.status(404);
        throw new Error("This group does not exist!");
    }
    const {taskName, taskDescription} = req.body
    if(!taskName, !taskDescription){
        res.status(400);
        throw new Error("Task name and description are mandatory!");
    }

    const addedTask = await Task.create({
        taskName, 
        taskDescription,
        group:group})

    group.tasks.push(addedTask);

    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, {
        tasks:group.tasks
    });

    res.status(201).json(await Group.findById(req.params.id).populate("tasks").populate("users"));
});

const addUserToGroup = asyncHandler (async(req, res) => {
    const foundGroup = await Group.findById(req.params.id);
    if (!foundGroup){
        res.status(404);
        throw new Error("This group does not exist!");
    }
    const{userId} = req.body;
    const foundUser = await User.findById(userId);
    if (!userId){
        res.status(404);
        throw new Error("this user does not exist!");
    }

    if (foundGroup.users.includes(foundUser._id)){
        res.status(404);
        throw new Error("This user is already included in this group!");
    }

    foundGroup.users.push(foundUser);
    foundUser.groups.push(foundGroup);

    await Group.findByIdAndUpdate(foundGroup.id, {
        users:foundGroup.users
    })

    await User.findByIdAndUpdate(foundUser.id, {
        groups:foundUser.groups
    });

    res.status(200).json(await Group.findById(req.params.id).populate("users").populate("tasks"));
});

module.exports = { getGroups, getGroupById, addGroup, deleteGroup, addTask, addUserToGroup }
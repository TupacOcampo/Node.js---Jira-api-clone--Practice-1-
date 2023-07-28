const asyncHandler = require("express-async-handler");
const Group = require("../models/groupModel");

const getGroups = asyncHandler( async ( req, res) => {
    const groups = await Group.find();
    res.status(200).json(groups);
});

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



const deleteGroup = asyncHandler(async(req, res) => {
    const foundGroup = await Group.findByIdAndDelete (req.params.id);

    if (!foundGroup){
        res.status(404).json({message:"Group does not exists"});
        throw new Error("This group does not exist")
    }

    res.status(200).json(foundGroup);
});

module.exports = {getGroups, addGroup, deleteGroup}
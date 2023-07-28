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


module.exports = {getGroups, addGroup}
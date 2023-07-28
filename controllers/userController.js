const asyncHandler = require ("express-async-handler");
const User = require("../models/userModel");
const bvrypt = require("bcryptjs");

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find().populate(["groups", "tasks"]);
    res.status(200).json(users);
});

const getUserById = asyncHandler(async(req, res) => {
    const foundUser = await User.fingById(req.params.id);
    if (!foundUser){
        res.status(404);
        throw new Error("This user does not exist!");
    }
});

const createNewUser = asyncHandler(async(req, res) => {
    const {userName, email, password} = req.body;
    if (!userName || !email || !password){
        res.status(404);
        throw new Error("All fields are mandatory!");
    }
    else if (await User.exists({userName:userName}) || await User.exists({email:email})){
        res.status(400);
        throw new Error("This username or email is already in use!");
    }
    const hashedPassword = await bvrypt.hash(password, 10);
    const newUser = await User.create({userName, email, password:hashedPassword});
    res.status(201).json(newUser);
});

const deleteUserById = asyncHandler( async(req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({"message":"User deleted"})
});

module.exports = { getAllUsers, getUserById, createNewUser, deleteUserById };
const asyncHandler = require ("express-async-handler");
const User = require("../models/userModel");
const bvrypt = require("bcrypt");
const createJWT = require("../services/encryption")

//Test methods - Get all user info
//Public access just for practice

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

const login = asyncHandler ( async (req, res) => {
    const {email, password} = req.body;

    if (!email, !password){
        res.status(404);
        throw new Error("All fields are mandatory!");
    }

    const foundUser = await User.findOne({email:email})
    if (!foundUser){
        res.status(404);
        throw new Error ("This email does not exist!");
    }

    if (!await bvrypt.compare(password, foundUser.password)){
        res.status(500);
        throw new Error("Incorrect password!");
    }
    
    const accessToken = createJWT({
        user:{
            userName: foundUser.User,
            email:foundUser.email
        },
    });

    res.status(200).json({"AccessToken":`${accessToken}`}); 
});

module.exports = { login, getAllUsers, getUserById, createNewUser, deleteUserById };
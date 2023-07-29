const express = require("express");
const userRoute = express.Router();
const { login, getAllUsers, getUserById, createNewUser, deleteUserById } = require("../controllers/userController");

userRoute.route("/")
    .get(getAllUsers)
    .post(createNewUser);

userRoute.route("/:id")
    .get(getUserById)
    .delete(deleteUserById);

userRoute.route("/login")
    .post(login);

module.exports = userRoute
const express = require("express");
const userRoute = express.Router();
const { getAllUsers, getUserById, createNewUser, deleteUserById } = require("../controllers/userController");

userRoute.route("/")
    .get(getAllUsers)
    .post(createNewUser);

userRoute.route("/:id")
    .get(getUserById)
    .delete(deleteUserById);

module.exports = userRoute
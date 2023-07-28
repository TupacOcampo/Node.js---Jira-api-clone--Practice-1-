const express = require("express");
const groupRoutes = express.Router();
const {getGroups, addGroup, deleteGroup, addTask} = require ("../controllers/groupController");

groupRoutes.route("/")
    .get(getGroups)
    .post(addGroup);

groupRoutes.route("/:id")
    .delete(deleteGroup);

groupRoutes.route("/:id/tasks")
    .post(addTask);

module.exports = groupRoutes;
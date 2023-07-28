const express = require("express");
const groupRoutes = express.Router();
const {getGroups, getGroupById, addGroup, deleteGroup, addTask, addUserToGroup } = require ("../controllers/groupController");

groupRoutes.route("/")
    .get(getGroups)
    .post(addGroup);

groupRoutes.route("/:id")
    .get(getGroupById)
    .post(addUserToGroup)
    .delete(deleteGroup);

groupRoutes.route("/:id/tasks")
    .post(addTask);

module.exports = groupRoutes;
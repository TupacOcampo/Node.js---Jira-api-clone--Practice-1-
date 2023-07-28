const express = require("express");
const groupRoutes = express.Router();
const {getGroups, addGroup, deleteGroup} = require ("../controllers/groupController");

groupRoutes.route("/")
    .get(getGroups)
    .post(addGroup);

groupRoutes.route("/:id")
    .delete(deleteGroup);

module.exports = groupRoutes;
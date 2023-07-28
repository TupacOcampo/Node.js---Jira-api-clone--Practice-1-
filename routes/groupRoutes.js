const express = require("express");
const groupRoutes = express.Router();
const {getGroups, addGroup} = require ("../controllers/groupController");

groupRoutes.route("/")
    .get(getGroups)
    .post(addGroup);

module.exports = groupRoutes;
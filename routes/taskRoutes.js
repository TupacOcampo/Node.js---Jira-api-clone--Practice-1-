const express = require ("express");
const taskRouter = express.Router();
const {getAllTasks, createNewTask, deleteTask } = require("../controllers/taskController")

taskRouter.route("/")
    .get(getAllTasks)
    .post(createNewTask);

taskRouter.route("/:id")
    .delete(deleteTask);

module.exports = taskRouter;
const express = require ("express");
const taskRouter = express.Router();
const {getAllTasks, getTaskById, deleteTask, assignTaskToUser } = require("../controllers/taskController")

taskRouter.route("/")
    .get(getAllTasks)

taskRouter.route("/:id")
    .get(getTaskById)
    .post(assignTaskToUser)
    .delete(deleteTask);

module.exports = taskRouter;
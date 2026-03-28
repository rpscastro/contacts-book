const express = require("express");
const router = express.Router();
const taskValidate = require("../utilities/task-validation");
const auth = require("../utilities/authenticate");

const tasksController = require("../controllers/tasks");

router.get("/", tasksController.getAllTasks);

router.get("/:id", tasksController.getTaskById);

router.post("/", auth.isAuthenticated, taskValidate.addTaskRules(), taskValidate.checkTaskData, tasksController.createTask);

router.put("/:id", auth.isAuthenticated, taskValidate.addTaskRules(), taskValidate.checkTaskData, tasksController.updateTask);

router.delete("/:id", auth.isAuthenticated, tasksController.deleteTask);

module.exports = router;
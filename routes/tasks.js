const express = require("express");
const router = express.Router();
const taskValidate = require("../utilities/task-validation");

const tasksController = require("../controllers/tasks");

router.get("/", tasksController.getAllTasks);

router.get("/:id", tasksController.getTaskById);

router.post("/", taskValidate.addTaskRules(), taskValidate.checkTaskData, tasksController.createTask);

router.put("/:id", taskValidate.addTaskRules(), taskValidate.checkTaskData, tasksController.updateTask);

router.delete("/:id", tasksController.deleteTask);

module.exports = router;
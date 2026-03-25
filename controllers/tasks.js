const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllTasks = async (req, res) => {
  // #swagger.tags = ['Tasks']
  // Implementation for getting all tasks
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("tasks")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("getAllTasks error:", error);
    res.status(500).json({ message: error.message || error });
  }
};

const getTaskById = async (req, res) => {
  // #swagger.tags = ['Tasks']
  // Implementation for getting a task by ID
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid task id to find a task.");
  }
  try {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("tasks")
      .findOne({ _id: taskId });
    if (!result) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("getTaskById error:", error);
    res.status(500).json({ message: error.message || error });
  }
};

const createTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  // Implementation for creating a new task
  const taskData = {
    taskDescription: req.body.taskDescription,
    taskArea: req.body.taskArea,
    taskDueDate: req.body.taskDueDate,
    taskStatus: req.body.taskStatus,
  };
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("tasks")
      .insertOne(taskData);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while creating the task." });
    }
  } catch (error) {
    console.error("createTask error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  // Implementation for updating an existing task
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid task id to update a task.");
  }
  const taskId = new ObjectId(req.params.id);
  const taskData = {
    taskDescription: req.body.taskDescription,
    taskArea: req.body.taskArea,
    taskDueDate: req.body.taskDueDate,
    taskStatus: req.body.taskStatus,
  };
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("tasks")
      .replaceOne({ _id: taskId }, taskData);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while updating the task." });
    }
  } catch (error) {
    console.error("updateTask error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  // Implementation for deleting a task
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid task id to delete a task.");
  }
  const taskId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("tasks")
      .deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while deleting the task." });
    }
  } catch (error) {
    console.error("deleteTask error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

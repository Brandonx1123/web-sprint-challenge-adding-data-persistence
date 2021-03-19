// build your `/api/tasks` router here
const express = require("express");
const router = express.Router();

const Task = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const alltasks = await Task.getAllProjects();
    res.status(200).json(alltasks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const taskWithId = await Task.getById(req.params.id);
    res.status(200).json(taskWithId);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addNewTask = await Task.createTask(req.body);
    res.status(201).json(addNewTask);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    messsage: "Look deeper to find the error",
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;

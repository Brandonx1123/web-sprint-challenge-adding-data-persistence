// build your `/api/projects` router here
const express = require("express");
const router = express.Router();

const Project = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await Project.getAllProjects();
    res.status(200).json(allProjects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const projectWithId = await Project.getById(req.params.id);
    res.status(200).json(projectWithId);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addNewProject = await Project.createProject(req.body);
    res.status(201).json(addNewProject);
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

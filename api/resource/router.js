// build your `/api/resources` router here
const express = require("express");
const router = express.Router();

const Resource = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const allResources = await Resource.getAllResources();
    res.status(200).json(allResources);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resourceWithId = await Resource.getById(req.params.id);
    res.status(200).json(resourceWithId);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addNewResource = await Resource.createResource(req.body);
    res.status(201).json(addNewResource);
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

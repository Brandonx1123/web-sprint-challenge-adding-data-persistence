// build your `Task` model here
const db = require("../../data/dbConfig");
const middleWare = require("../middleware/middleware");

const getAllTasks = () => {
  const allTasks = db("tasks as ta")
    .select(
      "ta.task_id",
      "ta.task_description",
      "ta.task_notes",
      "ta.task_completed",
      "p.project_name",
      "p.project_description"
    )
    .join("projects as p", "ta.project_id", "p.project_id");
  return allTasks.then((tasks) => {
    return tasks.map((task) => middleWare.taskReqBody(task));
  });
};

const getById = async (task_id) => {
  try {
    const task = await db("projects").where({ task_id }).first();
    return {
      ...task,
      task_completed: task.task_completed === 0 ? false : true,
    };
  } catch (err) {
    return { err: "not getting task" };
  }
};

const createTask = async (task) => {
  const [id] = await db("tasks").insert(task, [
    "task_id",
    "task_description",
    "task_notes",
    "task_completed",
    "project_id",
  ]);
  return getById(id);
};

module.exports = {
  getAllTasks,
  getById,
  createTask,
};

// build your `Task` model here
const db = require("../../data/dbConfig");
const middleWare = require("../middleware/middleware");

const getAllTasks = (id) => {
  if (id) {
    return db("tasks").where("task_id", id);
  }
  return db("tasks");
};

// const getAllTasks = () => {
//   const allTasks = db("tasks as ta")
//     .select(
//       "ta.task_id",
//       "ta.task_description",
//       "ta.task_notes",
//       "ta.task_completed",
//       "p.project_name",
//       "p.project_description"
//     )
//     .join("projects as p", "ta.tprojec_id", "p.project_id");
//   return allTasks.then((tasks) => {
//     return tasks.map((task) => middleWare.taskReqBody(task));
//   });
// };

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

// const createTask = async (task) => {
//   const [id] = await db("tasks").insert(task, [
//     "task_id",
//     "task_description",
//     "task_notes",
//     "task_completed",
//     "project_id",
//   ]);
//   return getById(id);
// };

function createTask(task) {
  return db("tasks")
    .insert(task)
    .then((res) => {
      return getById(res[0]);
    });
}

module.exports = {
  getAllTasks,
  getById,
  createTask,
};

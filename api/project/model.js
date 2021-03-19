const db = require("../../data/dbConfig");
const middleWare = require("../middleware/middleware");

const getAllProjects = async () => {
  const getProject = db("projects as p").select(
    "p.project_name",
    "p.project_description",
    "p.project_completed"
  );
  return getProject.then((projects) => {
    return projects.map((project) => middleWare.projectReqBody(project));
  });
};

const getById = async (id) => {
  try {
    const project = await db("projects").where({ id }).first();
    return {
      ...project,
      project_completed: project.project_completed === 0 ? false : true,
    };
  } catch (err) {
    return { err: "cannot get your specified project, try again" };
  }
};

const createProject = async (project) => {
  const [id] = await db("projects").insert(project, [
    "project_id",
    "project_name",
    "project_description",
    "project_completed",
  ]);
  return getById(id);
};

module.exports = {
  getAllProjects,
  getById,
  createProject,
};

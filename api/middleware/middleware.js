function intToBool(int) {
  return int === 1 ? true : false;
}
function projectReqBody(project) {
  const result = {
    ...project,
    project_completed: intToBool(project.project_completed),
  };
  return result;
}

function taskReqBody(task) {
  const result = {
    ...task,
    task_completed: intToBool(task.task_completed),
  };
  return result;
}

module.exports = { projectReqBody, taskReqBody };

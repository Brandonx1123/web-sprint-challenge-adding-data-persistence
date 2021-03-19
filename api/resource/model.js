// build your `Resource` model here
const db = require("../../data/dbConfig");

const getAllResources = () => {
  return db("resources");
};

const getById = (id) => {
  return db("resources").where("id", id).first();
};

const createResource = async (resource) => {
  const [id] = await db("resources").insert(resource, [
    "resource_id",
    "resource_name",
    "resource_description",
  ]);
  return getById(id);
};

module.exports = {
  getAllResources,
  getById,
  createResource,
};

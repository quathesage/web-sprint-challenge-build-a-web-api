// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProjectBody,
} = require("./projects-middleware");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch(() => res.json([]));
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProjectBody, async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.json(project);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put("/:id", validateProjectId, validateProjectBody, async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  try {
    const project = await Projects.update(id, {
      name,
      description,
      completed,
    });
    res.json(project);
  } catch (err) {
    res.json(err.message);
  }
});
router.delete("/:id", validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    await Projects.remove(id);
    res.json(req.project);
  } catch (err) {
    res.json(err);
  }
});
router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;

  try {
    const actions = await Projects.getProjectActions(id);
    res.json(actions);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

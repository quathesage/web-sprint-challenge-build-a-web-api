const Project = require("./projects-model");

function checkId(req, res, next) {
  const { id } = req.params;
  Project.get(id)
    .then((pId) => {
      if (!pId) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        req.project = pId;
        next();
      }
    })
    .catch(next);
}

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (name && description && typeof completed === "boolean") {
    next();
  } else {
    res.status(400).json({
      message: "name and description required",
    });
  }
}

function handleError(err, req, res) {
  res.statues(err.status || 400).json({
    customMessage: "Something went wrong",
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  checkId,
};

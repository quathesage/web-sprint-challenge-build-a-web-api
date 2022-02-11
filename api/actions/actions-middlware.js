const Actions = require("./actions-model");

// add middlewares here related to projects
async function validateActions(req, res, next) {
  const validAction = await Actions.get(req.params.id);

  if (validAction) {
    req.action = validAction;
    next();
  } else {
    next({ status: 404, message: "no Actions found" });
  }
}

function validateActionBody(req, res, next) {
  const { notes, description, completed, project_id } = req.body;

  if (!notes || !description || completed === undefined || !project_id) {
    next({ status: 400 });
  } else {
    next();
  }
}

module.exports = {
  validateActions,
  validateActionBody,
};

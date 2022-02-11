const Action = require("./actions-model");

async function checkActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action id not found",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Action not found",
    });
  }
}

function validateActionPost(req, res, next) {
  const { project_id, descripton, notes } = req.body;
  if (project_id && descripton && notes) {
    next();
  } else {
    res.status(400).json({
      message: "missing required post fields",
    });
  }
}

module.exports = {
  checkActionId,
  validateActionPost,
};

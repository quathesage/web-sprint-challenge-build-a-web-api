const express = require("express");
const Actions = require("./actions-model");
const { validateActions, validateActionBody } = require("./actions-middlware");

const action = express.Router();

action.get("/", (req, res) => {
  Actions.get()
    .then((actions) => res.json(actions))
    .catch(() => res.json([]));
});

action.get("/:id", validateActions, (req, res) => {
  res.json(req.action);
});

action.post("/", validateActionBody, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.json(newAction);
    console.log(newAction);
  } catch (err) {
    res.json({ message: err.message });
  }
});

action.put("/:id", validateActions, validateActionBody, async (req, res) => {
  const { id } = req.params;
  try {
    const updateAction = await Actions.update(id, req.body);
    res.json(updateAction);
  } catch (err) {
    res.json(err.message);
  }
});

action.delete("/:id", validateActions, async (req, res) => {
  const { id } = req.params;

  try {
    await Actions.remove(id);
    res.json(req.action);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = action;

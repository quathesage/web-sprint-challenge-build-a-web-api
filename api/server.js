const express = require("express");
const server = express();
const actionsRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

server.use(express.json());
server.use("/api/actions", actionsRouter);
// server.use("./api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Sprint Challenge</h1>`);
});

module.exports = server;

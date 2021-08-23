
const express = require("express");
const { Model } = require("sequelize/types");
require("./database");
const routes = require("./routes")

const app = express();

app.use(routes);

module.exports = app;
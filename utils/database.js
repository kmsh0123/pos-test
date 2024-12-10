const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./utils/dev.sqlite",
});
module.exports = sequelize;

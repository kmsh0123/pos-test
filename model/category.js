const Sequelize = require("sequelize");
const sequelize = require("../utils/database");


const Category = sequelize.define("category", {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Category;

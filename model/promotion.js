const Sequlize = require("sequelize");
const sequelize = require("../utils/database");
const Category = require("./category");

const Promotion = sequelize.define("promotion", {
  name: {
    type: Sequlize.STRING,
    allowNull: false,
  },
  promotionValue: {
    type: Sequlize.INTEGER,
    allowNull: false,
  },

  startDate: {
    type: Sequlize.STRING,
    allowNull: false,
  },
  endDate: {
    type: Sequlize.STRING,
    allowNull: false,
  },
});

Promotion.belongsTo(Category);
module.exports = Promotion;

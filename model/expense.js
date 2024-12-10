const Sequlize = require("sequelize");
const sequelize = require("../utils/database");

const expenseItem = sequelize.define("Expense", {
  date: { type: Sequlize.STRING, allowNull: true },
  expenseAmount: {
    type: Sequlize.INTEGER,
    allowNull: true,
  },
  expenseFor: {
    type: Sequlize.STRING,
    allowNull: true,
  },
});
module.exports = expenseItem;

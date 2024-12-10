const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const orderHistory = sequelize.define("order_history", {
  product_name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  Purchase: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = orderHistory;

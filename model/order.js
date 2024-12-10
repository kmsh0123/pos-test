const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const productHistory = require("./orderhistory");

const Order = sequelize.define("order", {
  invoice_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  payamount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  grandtotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  payback: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Order.hasMany(productHistory);
module.exports = Order;

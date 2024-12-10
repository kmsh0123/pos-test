const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Rental = sequelize.define("rental", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  startDate: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  endDate: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  paidAmount: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  totalAmount: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  paymentType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
module.exports = Rental;

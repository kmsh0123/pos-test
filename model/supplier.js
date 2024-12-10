const Sequlize = require("sequelize");
const sequelize = require("../utils/database");

const Supplier = sequelize.define("supplier", {
  name: {
    type: Sequlize.STRING,
    unique: true,
    allowNull: false,
  },
  phone: {
    type: Sequlize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequlize.STRING``,
    allowNull: false,
  },
  note: {
    type: Sequlize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequlize.STRING,
    allowNull: false,
  },
});
module.exports = Supplier;

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Promotion = require("./promotion")

const uniqueItem = sequelize.define("Unique_Item", {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  sale_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  purchase_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  category: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  discount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  checkUnique: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
uniqueItem.belongsTo(Promotion)

module.exports = uniqueItem;

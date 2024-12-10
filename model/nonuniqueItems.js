const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Category = require("./category");
const Promotion = require("./promotion")

const nonuniqueItem = sequelize.define("NonUnique_Item", {
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
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  checkUnique: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  minQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue : 0,
  },
  lost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue : 0,
  },
  expiredDate: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

nonuniqueItem.belongsTo(Category);
nonuniqueItem.belongsTo(Promotion)

module.exports = nonuniqueItem;

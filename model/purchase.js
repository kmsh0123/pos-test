const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Supplier = require("./supplier");

const Purchase = sequelize.define("purchase", {
  invoice_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  purchaseDate: { type: Sequelize.STRING, allowNull: false },
  totalAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  productData: {
    type: Sequelize.JSON,
    allowNull: false,
  },
});
Purchase.belongsTo(Supplier);
module.exports = Purchase;

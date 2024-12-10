const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const SidebarCategory = sequelize.define("sidebarcategory", {
  name: { type: Sequelize.STRING, allowNull: false },
});
module.exports = SidebarCategory;

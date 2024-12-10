const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const SidebarCategory = require("./sidebarcategory");

const Sidebar = sequelize.define("sidebar", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pathname: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
Sidebar.belongsTo(SidebarCategory);

module.exports = Sidebar;

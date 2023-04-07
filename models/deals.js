const Sequelize = require("sequelize");
const db = require("../config/db");
const DealsHistory = require("./deals_history");
// const Deal = require("./deals");
const Site = require("./sites");
const deals = db.define(
  "deals",
  {
    slug: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    removed: {
      type: Sequelize.BOOLEAN,
    },
    type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.NUMBER,
    },
    revenue: {
      type: Sequelize.NUMBER,
    },
    income: {
      type: Sequelize.NUMBER,
    },
    site_id: {
      type: Sequelize.NUMBER,
    },
    createdAt: { type: Sequelize.DATE, field: "created_at" },
    updatedAt: { type: Sequelize.DATE, field: "updated_at" },
  },
  
  {
    timestamps: true,
    freezeTableName: true,
  }
);

deals.belongsTo(Site, { foreignKey: "site_id" });
module.exports = deals;

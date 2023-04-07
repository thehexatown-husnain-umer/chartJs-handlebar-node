const Sequelize = require("sequelize");
const db = require("../config/db");

// const deals_history = require("./deals_history");
const deals = require("./deals");
const Site = require("./sites");
const deals_history = db.define(
  "deals_history",
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
    deal_id: {
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

module.exports = deals_history;

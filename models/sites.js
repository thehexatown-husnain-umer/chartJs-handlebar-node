const Sequelize = require("sequelize");
const db = require("../config/db");

const sites = db.define(
  "sites",
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
    listing_url: {
      type: Sequelize.STRING,
    },
    createdAt: { type: Sequelize.DATE, field: "created_at" },
    updatedAt: { type: Sequelize.DATE, field: "updated_at" },
  },

  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = sites;

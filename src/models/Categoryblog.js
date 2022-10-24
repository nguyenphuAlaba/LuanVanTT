"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoryblog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //mot categoryblog co nhieu blog
      Categoryblog.hasMany(models.Blog, {
        foreignKey: "cat_id",
        as: "CategoryBlog",
      });
    }
  }
  Categoryblog.init(
    {
      cat_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categoryblog",
      freezeTableName: true,
    }
  );
  return Categoryblog;
};

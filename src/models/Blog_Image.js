"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog_Image.belongsTo(models.Blog, {
        foreignKey: "blog_id",
        targetKey: "id",
        as: "BlogImage",
      });
    }
  }
  Blog_Image.init(
    {
      img: DataTypes.TEXT,
      blog_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Blog_Image",
      freezeTableName: true,
    }
  );
  return Blog_Image;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentblog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commentblog.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "CommentBlogUser",
      });
      Commentblog.belongsTo(models.Blog, {
        foreignKey: "blog_id",
        targetKey: "id",
        as: "CommentBlog",
      });
    }
  }
  Commentblog.init(
    {
      user_id: DataTypes.INTEGER,
      // product_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      blog_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Commentblog",
      freezeTableName: true,
    }
  );
  return Commentblog;
};

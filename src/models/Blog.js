"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //mot blog chi thuoc mot user
      Blog.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "UserBlog",
      });
      Blog.belongsTo(models.Categoryblog, {
        foreignKey: "cat_id",
        targetKey: "id",
        as: "CategoryBlog",
      });
      Blog.hasMany(models.Commentblog, {
        foreignKey: "blog_id",
        as: "CommentBlog",
      });
      Blog.hasMany(models.Blog_Image, {
        foreignKey: "blog_id",
        as: "BlogImage",
      });
    }
  }
  Blog.init(
    {
      name: DataTypes.STRING,
      Description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      cat_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Blog",
      freezeTableName: true,
    }
  );
  return Blog;
};

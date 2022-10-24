"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //mot hinh chi duy nhat 1 product
      // Product_Image.belongsTo(models.Product, {
      //   foreignKey: "product_id",
      //   as: "ProductImg",
      // });

      Product_Image.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
        as: "ProductImg",
      });
    }
  }
  Product_Image.init(
    {
      url: DataTypes.STRING,
      public_id: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Image",
      freezeTableName: true,
    }
  );
  return Product_Image;
};

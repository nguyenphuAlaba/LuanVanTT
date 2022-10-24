"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //mot hinh chi duy nhat 1 product
      // Attribute.belongsTo(models.Product, {
      //   foreignKey: "product_id",
      //   as: "ProductImg",
      // });

      Attribute.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
        as: "ProductAttribute",
      });
      Attribute.hasMany(models.Option, {
        foreignKey: "attribute_id",
        as: "AttributeOption",
      });
    }
  }
  Attribute.init(
    {
      name: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attribute",
      freezeTableName: true,
    }
  );
  return Attribute;
};

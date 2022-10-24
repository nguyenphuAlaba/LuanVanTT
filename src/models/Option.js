"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //mot hinh chi duy nhat 1 product
      // Option.belongsTo(models.Product, {
      //   foreignKey: "product_id",
      //   as: "ProductImg",
      // });

      Option.belongsTo(models.Attribute, {
        foreignKey: "attribute_id",
        targetKey: "id",
        as: "AttributeOption",
      });
    }
  }
  Option.init(
    {
      name: DataTypes.STRING,
      attribute_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Option",
      freezeTableName: true,
    }
  );
  return Option;
};

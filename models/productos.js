"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productos.belongsTo(models.Categorias);

      Productos.belongsToMany(models.Pedido, {
        through: models.Pedido_Productos,
      });
      
      Productos.hasMany(models.Review);
    }
  }
  Productos.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Por favor introduce el nombre del producto" },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Por favor introduce un precio" },
        },
      },
      CategoriaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Productos",
    }
  );
  return Productos;
};

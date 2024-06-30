"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pedido_Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido_Productos.init(
    {
      ProductosId: DataTypes.INTEGER,
      PedidoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pedido_Productos",
    }
  );
  return Pedido_Productos;
};

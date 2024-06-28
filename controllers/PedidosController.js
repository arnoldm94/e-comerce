const { Pedidos } = require("../models/index");

const PedidosController = {
  insert(req, res) {
    Pedidos.create(req.body)
      .then((pedido) => {
        pedido.addProductos(req.body.ProductoId);
        res.send(pedido);
      })
      .catch((err) => console.error(err));
  },
  async getAll(req, res) {
    try {
      const pedidos = await Pedidos.findAll({
        include: [{ model: Productos, through: { attributes: [] } }],
      });
      res.send(pedidos);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = PedidosController;

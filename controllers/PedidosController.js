const {
  Productos,
  Sequelize,
  Pedido,
  Pedido_Productos,
} = require("../models/index.js");
const { Categorias } = require("../models/index.js");
const { Op } = Sequelize;

const PedidosController = {
  create(req, res) {
    req.body.role = "pedido";
    Pedido.create()
      .then(() => res.status(201).send({ message: "Pedido creado con éxito" }))
      .catch((err) => console.error(err));
  },

  getAll(req, res) {
    Pedido.findAll({
      include: [{ model: Productos, through: { attributes: [] } }],
    })
      .then((pedidos) => res.send(pedidos))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los pedidos",
        });
      });
  },
};

module.exports = PedidosController;

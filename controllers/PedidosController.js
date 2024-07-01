const {
  Productos,
  Sequelize,
  Pedido,
  Pedido_Productos,
  Review,
  Categorias,
  User,
  Token,
} = require("../models/index.js");

const { Op } = Sequelize;

const PedidosController = {
  //crear pedido
  create(req, res) {
    req.body.role = "pedido";
    Pedido.create({ ...req.body, UserId: req.user.id })
      .then(() => res.status(201).send({ message: "Pedido creado con éxito" }))
      .catch((err) => console.error(err));
  },

  //traer todos los pedidos
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

  //actualizar producto
  async update(req, res) {
    await Pedido.update(
      {
        UserId: DataTypes.INTEGER,
      },
      { where: { id: req.params.id } }
    );
    res.send("Pedido actualizado con éxito");
  },
};

module.exports = PedidosController;

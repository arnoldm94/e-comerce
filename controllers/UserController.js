const {
  Productos,
  Sequelize,
  Pedido,
  Pedido_Productos,
  Review,
  Categorias,
  User,
} = require("../models/index.js");
const review = require("../models/review.js");

const { Op } = Sequelize;

const UserController = {
  //crear User
  create(req, res) {
    req.body.role = "user";
    User.create(req.body)
      .then((user) =>
        res.status(201).send({ message: "User creado con éxito", user })
      )
      .catch((err) => console.error(err));
    /* next(error); */
  },

  //actualizar user
  async update(req, res) {
    await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
      { where: { id: req.params.id } }
    );
    res.send("User actualizado con éxito");
  },

  //borrar User
  async delete(req, res) {
    try {
      await User.destroy({
        where: { id: req.params.id },
      });
      res.send({ message: "User has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos Users
  getAll(req, res) {
    User.findAll({ include: [Pedido] }, { include: [Review] })
      .then((user) => res.send(user))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los Users",
        });
      });
  },

  //get by id
  getById(req, res) {
    User.findByPk(req.params.id, {
      include: [
        { model: Review, attributes: ["comment"] },
        { model: Productos, attributes: ["name"] },
        { model: Pedido, attributes: [] },
      ],
    }).then((producto) => res.send(producto));
  },

  // buscar User por nombre
  getOneByName(req, res) {
    User.findOne({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
      include: [Pedido],
    }).then((user) => res.send(user));
  },
};

module.exports = UserController;

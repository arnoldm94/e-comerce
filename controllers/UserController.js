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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const { Op } = Sequelize;

const UserController = {
  //crear User
  create(req, res) {
    req.body.role = "user";
    const password = bcrypt.hashSync(req.body.password, 10);
    User.create({ ...req.body, password: password })
      .then((user) =>
        res.status(201).send({ message: "Usuario creado con éxito", user })
      )
      .catch((err) => console.error(err));
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

  //login de usuario
  login(req, res) {
    User.findOne({
      where: { email: req.body.email },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    });
  },

  //logout de usuario
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },
};

module.exports = UserController;

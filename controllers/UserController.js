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
const { where } = require("sequelize");
const { jwt_secret } = require("../config/config.json")['development'];

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

  // get by id
  async getById(req, res) {
    const userId = parseInt(req.user.id);
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      res.json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error mostrando usuario' })
    }
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

  //traer user junto a pedidos/productos
  getUsersPedidos(req, res) {
    User.findByPk(req.user.id,{ include: [{model: Pedido, include: [Productos]}] })
      .then((user) => res.send(user))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los Users",
        });
      });
  },
};

module.exports = UserController;

const { Productos, Sequelize } = require("../models/index.js");
const { Categorias } = require("../models/index.js");
const { Op } = Sequelize

const ProductosController = {
  //crear producto
  // create(req, res, next) {
  //   req.body.role = "producto";
  //   Productos.create(req.body)
  //     .then((producto) =>
  //       res.status(201).send({ message: "Producto creado con éxito", producto })
  //     )
  //     .catch((err) => console.error(err))
  // },
  async create(req, res, next) {
    try {
      req.body.role = 'producto'
      const Productos = await Productos.create({ ...req.body })
      res.status(201).send({ message: "Producto creado con éxito", producto })
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
 

  //actualizar producto
  async update(req, res) {
    await Productos.update(
      {
        name: req.body.name,
        price: req.body.price,
        CategoriaId: req.body.CategoriaId,
      },
      { where: { id: req.params.id } }
    );
    res.send("Producto actualizado con éxito");
  },

  //borrar producto
  async delete(req, res) {
    try {
      await Productos.destroy({
        where: { id: req.params.id },
      });
      res.send({ message: "Product has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos productos con categoria
  getAll(req, res) {
    Productos.findAll({include: [Categorias]})
      .then((productos) => res.send(productos))
      .catch((err) => {
        console.log(err)
        res.status(500).send({
            message: 'Ha habido un problema al cargar los productos',
          })
      })
  },

  // ver un producto por su id
  getById(req, res) {
    Productos.findByPk(req.params.id, {
      include: [{ model: Categorias, attributes: ['name'] }],
    }).then((producto) => res.send(producto))
  },
 
  // buscar producto por nombre
  getOneByName(req, res) {
    Productos.findOne({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
      include: [Categorias],
    }).then((producto) => res.send(producto))
  }, 

  // buscar producto por precio
  getOneByPrice(req, res) {
    Productos.findOne({
      where: {
        price: {
          [Op.like]: `${req.params.price}`,
        },
      },
    }).then((producto) => res.send(producto))
  }, 

  // getProductsSortedByPrice(req, res) {
  //   Productos.find().sort({ price: -1 })
  //       .then(products => {
  //           res.json(products);
  //       })
  //       .catch(err => {
  //           res.status(500).json({ message: err.message });
  //       });
  // },
}

module.exports = ProductosController;

const { Productos } = require("../models/index.js");
const { Categorias } = require("../models/index.js");

const ProductosController = {
  create(req, res) {
    req.body.role = "producto";
    Productos.create(req.body)
      .then((producto) =>
        res.status(201).send({ message: "Producto creado con éxito", producto })
      )
      .catch((err) => console.error(err));
  },

  async update(req, res) {
    await Productos.update(
      {
        name: req.body.name,
        price: req.body.price,
        CategoriasId: req.body.CategoriasId,
      },
      { where: { id: req.params.id } }
    );
    res.send("Producto actualizado con éxito");
  },

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

  getAll(req, res) {
    Productos.findAll({ include: [Categorias] })

      .then((productos) => res.send(productos))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "error",
        });
      });
  },
};

module.exports = ProductosController;

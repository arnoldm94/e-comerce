const { Productos } = require("../models/index.js");

const ProductosController = {
  create(req, res) {
    req.body.role = "producto";
    Productos.create(req.body)
      .then((producto) =>
        res.status(201).send({ message: "Producto creado con éxito", producto })
      )
      .catch((err) => console.error(err));
  },
};

module.exports = ProductosController;
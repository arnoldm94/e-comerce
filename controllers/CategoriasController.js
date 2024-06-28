const { Categorias } = require("../models/index");
const { Productos } = require("../models/index");

const CategoriasController = {
  //Crear categoria
  create(req, res) {
    Categorias.create(req.body)
      .then((categorias) =>
        res.status(201).send({ message: "categoria creada", categorias })
      )
      .catch((err) => console.error(err));
  },
  //Categoria por Id
  getById(req, res) {
    Categorias.findByPk(req.params.id)
      .then((categoria) => res.send(categoria))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar la categoria",
        });
      });
  },

  //actualizar categoria
  async update(req, res) {
    await Categorias.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );
    res.send("Categoria actualizada con éxito");
  },

  //Get all categorias
  getAll(req, res) {
    Categorias.findAll()
      .then((categorias) => res.send(categorias))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar las categorias",
        });
      });
  },

  //buscar por nombre
  getByName(req, res) {
    Categorias.findOne({
      where: {
        name: `${req.params.name}`,
      },
    })
      .then((categoria) => res.send(categoria))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar la categoria",
        });
      });
  },

  //Borarr categoria
  async delete(req, res) {
    await Categorias.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("La categoria ha sido eliminada con éxito");
  },
};

module.exports = CategoriasController;

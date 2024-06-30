const {
  Productos,
  Sequelize,
  Pedido,
  Pedido_Productos,
  Review,
  Categorias,
} = require("../models/index.js");
const review = require("../models/review.js");

const { Op } = Sequelize;

const ReviewController = {
  //crear Review
  create(req, res) {
    req.body.role = "review";
    Review.create(req.body)
      .then((review) =>
        res.status(201).send({ message: "Review creado con éxito", review })
      )
      .catch((err) => console.error(err));
    /* next(error); */
  },

  //actualizar review
  async update(req, res) {
    await Review.update(
      {
        Comment: req.body.Comment,
        ProductoId: req.body.ProductoId,
        UserId: req.body.UserId,
      },
      { where: { id: req.params.id } }
    );
    res.send("Review actualizado con éxito");
  },

  //borrar Review
  async delete(req, res) {
    try {
      await Review.destroy({
        where: { id: req.params.id },
      });
      res.send({ message: "Review has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos Review
  getAll(req, res) {
    Review.findAll({ include: [Productos] })
      .then((review) => res.send(review))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los Review",
        });
      });
  },
};

module.exports = ReviewController;

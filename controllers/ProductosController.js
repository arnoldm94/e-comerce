const {
  Productos,
  Sequelize,
  Pedido,
  Pedido_Productos,
  Review,
  Categorias,
} = require("../models/index.js");
const { Op } = Sequelize;

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
    /*   next(error); */
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

  // ver todos productos con categoria y reviews

  getAll(req, res) {
    Productos.findAll({ include: [Categorias, Review] })
      .then((productos) => res.send(productos))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los productos",
        });
      });
  },

  // ver todos productos con ordenes
  getAllOrders(req, res) {
    Productos.findAll({
      include: [{ model: Pedido, through: { attributes: [] } }],
    })
      .then((productos) => res.send(productos))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los productos",
        });
      });
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
    }).then((productos) => res.send(post));
  },

  // ver todos productos de mayor a menor precio
  getdescendent(req, res) {
    Productos.findAll()
      .then((productos) => {
        let filtered = [];
        let descendent = [];
        productos.forEach((element) => {
          filtered.push(element.price);
        });
        const ordenados = (arreglo) => {
          return [...arreglo].sort((a, b) => b - a);
        };
        let preciosordenados = ordenados(filtered);
        for (let i = 0; i < filtered.length; i++) {
          const price = preciosordenados[i];
          productos.forEach((product) => {
            if (product.price == price) {
              descendent.push(product);
            }
          });
        }
        res.send(descendent);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los productos",
        });
      });
  },
};

module.exports = ProductosController;

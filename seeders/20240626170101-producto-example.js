"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Productos", [
      {
        id: 1,
        name: "coches hot wheels",
        price: "8",
        CategoriasId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "pinceles",
        price: "3",
        CategoriasId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "pelota",
        price: "1",
        CategoriasId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "detergente",
        price: "8",
        CategoriasId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "mesa",
        price: "35",
        CategoriasId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

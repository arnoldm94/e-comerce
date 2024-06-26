"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categorias", [
      {
        id: 1,
        name: "juguetes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "hogar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "pintura",
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

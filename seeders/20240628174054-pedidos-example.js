"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Pedidos", [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
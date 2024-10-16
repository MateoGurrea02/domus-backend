'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PropertyStatus', [
      {
        status: 'Disponible'
      },
      {
        status: 'Vendido'
      },
      {
        status: 'Alquilado'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PropertyStatus', null, {});
  }
};

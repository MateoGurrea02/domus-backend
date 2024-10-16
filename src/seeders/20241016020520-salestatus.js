'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SaleStatus', [
      {
        type: 'Vendido'
      },
      {
        type: 'Cancelado'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SaleStatus', null, {});
  }
};

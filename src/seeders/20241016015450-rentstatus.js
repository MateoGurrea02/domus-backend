'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RentStatus', [
      {
        type: 'Alquilado'
      },
      {
        type: 'Terminado'
      },
      {
        type: 'Cancelado'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('RentStatus', null, {});
  }
};

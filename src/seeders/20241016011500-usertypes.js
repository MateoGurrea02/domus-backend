'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserType', [
      {
        type: 'Administrador'
      },
      {
        type: 'Agente'
      },
      {
        type: 'Cliente'
      },
      {
        type: 'Usuario'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserType', null, {});
  }
};

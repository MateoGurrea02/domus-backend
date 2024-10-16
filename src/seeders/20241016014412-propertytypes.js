'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PropertyType', [
      {
        type: 'Casa'
      },
      {
        type: 'Departamento'
      },
      {
        type: 'Local Comercial'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PropertyType', null, {});
  }
};

'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentdate = new Date();
    return queryInterface.bulkInsert('Agent', [
      {
        id: 1,
        user:1,
        createdAt: currentdate,
        updatedAt: currentdate
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Agent', null, {});
  }
};

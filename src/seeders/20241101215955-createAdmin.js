'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = await bcrypt.hash('admin', 10)
    const currentdate = new Date();
    return queryInterface.bulkInsert('User', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: password,
        type: 1,
        createdAt: currentdate,
        updatedAt: currentdate
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};

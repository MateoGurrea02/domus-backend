'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Agent', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Agent')
  }
};

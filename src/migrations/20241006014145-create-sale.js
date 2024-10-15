'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sale', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      property: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Property',
          key: 'id'
        },
        onDelete: 'CASCADE', 
      },
      client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Client',
          key: 'id'
        },
        onDelete: 'CASCADE', 
      },
      date: {
      type: Sequelize.DATE,
      allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SaleStatus',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Sale')
  }
};

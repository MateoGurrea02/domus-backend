'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sale', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      property: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Property',
          key: 'id'
        }
      },
      client: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Client',
          key: 'id'
        }
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
        type: Sequelize.BIGINT,
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

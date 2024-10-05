'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Rent', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
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
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finishDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      monthlyPrice: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'RentStatus',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Rent')
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Property', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      propertyType: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'PropertyType',
          key: 'id'
        }
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'PropertyStatus',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
      },
      size: {
        type: Sequelize.DECIMAL,
      },
      owner:{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Agent',
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Property')
  }
};

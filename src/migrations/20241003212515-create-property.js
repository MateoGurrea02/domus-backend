'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Property', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      propertyType: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
      agent:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Agent',
          key: 'id'
        },
        onDelete: 'CASCADE', 
      },
      title: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
      },
      maxResidents:{
        type: Sequelize.INTEGER,
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

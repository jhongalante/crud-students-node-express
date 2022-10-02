'use strict'

const DataTypes = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}

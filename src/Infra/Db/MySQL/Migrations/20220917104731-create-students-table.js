'use strict'
const DataTypes = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
      },
      academicRecord: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students')
  }
}

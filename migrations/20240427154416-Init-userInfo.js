'use strict';

const { DATEONLY } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserInfos',{
      userId:{
        type: Sequelize.STRING,
        references:{
          model:'Users',
          key:'id'
        },
        primaryKey:true,
        unique:true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      birthDay:{
        type:Sequelize.DATEONLY
      },
      intro:{
        type:Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllTables('UserInfos')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

'use strict';

const { DATEONLY } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('userInfos',{
      userId:{
        type: Sequelize.STRING,
        references:{
          model:'users',
          key:'id'
        }
      },
      birthDay:{
        type:Sequelize.DATEONLY
      },
      intro:{
        type:Sequelize.TEXT
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllTables('userInfos')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

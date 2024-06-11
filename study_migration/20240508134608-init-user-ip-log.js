'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserIPLogs', {
      id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:{
        type: Sequelize.STRING,
        references:{
          model:'Users',
          key:'id'
        },
        allowNull:true
      },
      IP:{
        type: Sequelize.STRING,
        allowNull:false
      },
      url:{
        type: Sequelize.STRING,
        allowNull:false
      }
      });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIPLogs');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

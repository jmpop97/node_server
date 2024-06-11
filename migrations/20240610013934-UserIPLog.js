'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserIPLogs', {
      userIpLogPk:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.STRING,
        references:{
          model:'Users',
          key:'userId'
        },
        allowNull:true
      },
      ip:{
        type: Sequelize.STRING,
        allowNull:false
      },
      api:{
        type: Sequelize.TEXT,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIPLogs')
  }
};

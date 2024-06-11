'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Authenfications',{
      authenficationId:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        autoIncrementIdentity:true,
        primaryKey:true
      },
      type:{
        type:Sequelize.STRING,
      },
      email:{
        type:Sequelize.STRING,
      },
      key:{
        type:Sequelize.STRING,
      },
      count:{
        type:Sequelize.INTEGER,
        defaultValue:1
      }
      ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Authenfications')
  }
};

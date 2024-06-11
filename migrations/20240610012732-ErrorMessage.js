'use strict';
const seed_db=require("../modules/seedDB")
const models=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ErrorMessages', {
      errorMessagePk: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      at:{
        type: Sequelize.STRING,
        allowNull:false
      },
      response: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      detail:{
        type: Sequelize.TEXT
      },
      intro:{
        type: Sequelize.TEXT
      }
    });
    let adds=await seed_db.seed_data('ErrorMessages')
    await models.ErrorMessage.bulkCreate(adds)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ErrorMessages')
  }
};

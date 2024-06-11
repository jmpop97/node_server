'use strict';
const seed_db=require("../modules/seedDB")
const {ErrorMessage}=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ErrorMessages', {
      id: {
        allowNull: false,
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
    await ErrorMessage.bulkCreate(adds)
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ErrorMessages');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

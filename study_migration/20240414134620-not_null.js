'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('Users','test4',{
      allowNull:false,
      type:Sequelize.STRING
    })])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('Users','test4',{
      type:Sequelize.STRING
    })])
  }
};

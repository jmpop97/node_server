'use strict';

const { Transaction } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('Users','lastName','changedName')
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users','lastName',{
        type:Sequelize.STRING},{Transaction}
      )
    ])
    }
};

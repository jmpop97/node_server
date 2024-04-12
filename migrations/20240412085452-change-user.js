'use strict';

const { Transaction } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users','test4',{
        type:Sequelize.TEXT},{Transaction}
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users','test4',{
        type:Sequelize.STRING},{Transaction}
      )
    ])
    }
};

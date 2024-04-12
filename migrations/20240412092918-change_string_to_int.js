'use strict';

const { Transaction } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users','test3',{
        type:'INTEGER USING CAST("test3" as INTEGER)'},{Transaction}
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users','test3',{
        type:Sequelize.STRING},{Transaction}
      )
    ])
    }
};

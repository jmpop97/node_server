'use strict';

const { Query } = require('pg');
const { Transaction, QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([queryInterface.sequelize.query(`
    UPDATE public."Users"
    SET test1 = ''
    WHERE test1 is null;
    `),
      queryInterface.changeColumn('Users','test1',{
        defaultValue:"메롱",
        allowNull:false,
    type:Sequelize.STRING},{Transaction}
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('Users','test1',{
      type:Sequelize.STRING},{Transaction}
    ),queryInterface.sequelize.query(`
    UPDATE public."Users"
    SET test1 = NULL
    WHERE test1 = '';
    `)

    ])
    }
};
'use strict';
require('dotenv').config();
const User = require("../modules/user")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    let id="admin"
    let password="admin"
    let email="admin@naver.com"
    let admin="Admin"
    await new User.LocalUser({id,password,email}).logUp()



    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

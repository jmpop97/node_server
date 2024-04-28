'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const name=["Deactivate","Delete"]
    var names=""
    for(var i in name){
        names += "('"+ name[i]+"'),"
    }
    await queryInterface.sequelize.query(`
    INSERT INTO public."Status"(
      "stateName")
     VALUES ${names.slice(0,-1)};`
    )
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

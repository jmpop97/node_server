'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John3',
        changedName: 'Doe3',
        email: 'demo3@demo.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        test1: "채우기"
      },{
        firstName: 'John',
        changedName: 'Doe',
        email: 'demo@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
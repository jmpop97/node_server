'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        changedName: 'Doe',
        email: 'demo@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        firstName: 'John2',
        changedName: 'Doe2',
        email: 'demo2@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
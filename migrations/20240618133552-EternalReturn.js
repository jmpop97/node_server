'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('EternalReturn',{
      eternalReturnPk:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      rank200Mmr:{
        type:Sequelize.INTEGER
      },
      rank200_minusMmr150people:{
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('EternalReturn')
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserInfos',{
      userInfoPk:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      userId:{
        type: Sequelize.STRING,
        references:{
          model:'Users',
          key:'userId'
        },
        unique:true,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      birthday:{
        type:Sequelize.DATEONLY
      },
      intro:{
        type:Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllTables('UserInfos')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

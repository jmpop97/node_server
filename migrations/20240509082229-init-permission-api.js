'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('APIs', 
    { apiId: 
      {
        type:Sequelize.STRING,
        primaryKey:true
      }
     });
    await queryInterface.createTable('PermissionAPIs', 
     { id: 
       {
         type:Sequelize.INTEGER,
         primaryKey:true,
         autoIncrement:true,
         autoIncrementIdentity:true,
       },
       authName:{
        type: Sequelize.STRING,
        references:{
          model:'Permissions',
          key:'authName'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      apiId:{
        type: Sequelize.STRING,
        references:{
          model:'APIs',
          key:'apiId'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
      });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PermissionAPIs');
    await queryInterface.dropTable('APIs');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

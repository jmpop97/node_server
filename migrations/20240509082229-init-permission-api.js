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
    await queryInterface.createTable('PermissionAPI', 
     { id: 
       {
         type:Sequelize.STRING,
         primaryKey:true,
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
    await queryInterface.dropTable('PermissionAPI');
    await queryInterface.dropTable('API');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

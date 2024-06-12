'use strict';
const seed_db=require("../modules/seedDB")
const models=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let adds=await seed_db.seed_data('Permissions')
    await queryInterface.createTable('Permissions', { 
      permissionPk:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      },
      authName:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
      }})
  // await models.Permission.bulkCreate(adds)
  await queryInterface.createTable('Permission_Users',{
    permission_userPk:{          
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId:{
      type: Sequelize.STRING,
      references:{
        model:'Users',
        key:'userId'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull:false
    },
    authName:{
    type: Sequelize.STRING,
    references:{
      model:'Permissions',
      key:'authName'
    },
    defaultValue:adds[1].authName,
    allowNull:false,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  }
}
)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Permission_Users")
    await queryInterface.dropTable("Permissions")
  }
};

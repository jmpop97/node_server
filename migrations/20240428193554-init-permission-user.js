'use strict';

const { query } = require('express');
const seed_db=require("../modules/seedDB")
const {Permission}=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', { 
        authName:{
          type:Sequelize.STRING,
          unique:true,
          primaryKey:true
        }})

    let adds=await seed_db.seed_data('Permissions')
    await Permission.bulkCreate(adds)

    // await queryInterface.bulkInsert('Permissions', [{
    //   //Fix seedDB
    //   authName: 'Admin',
    //  },
    // {
    //   authName: 'User',
    // }], {})

    await queryInterface.createTable('Permission_Users',{
      id:{          
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER},
      userId:{
      type: Sequelize.STRING,
      references:{
        model:'Users',
        key:'id'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    authName:{
      type: Sequelize.STRING,
      references:{
        model:'Permissions',
        key:'authName'
      },
      defaultValue:adds[1].authName,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  }
  )
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.dropTable('UserPermissions')
    await queryInterface.dropTable('Permission_Users')
    // await queryInterface.removeColumn('Users','permissions')
    await queryInterface.dropTable('Permissions');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

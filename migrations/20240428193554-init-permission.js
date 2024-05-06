'use strict';

const { query } = require('express');
const seed_db=require("../modules/seedDB")
const {Permission}=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', { 
        authId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        authName:{
          type:Sequelize.STRING,
          unique:true
        }})

    let adds=await seed_db.seed_data('Permissions',true)
    await Permission.bulkCreate(adds)

    // await queryInterface.bulkInsert('Permissions', [{
    //   //Fix seedDB
    //   authName: 'Admin',
    //  },
    // {
    //   authName: 'User',
    // }], {})

    await queryInterface.createTable('UserPermissions',{
      id:{          
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",},
      userId:{
      type: Sequelize.STRING,
      references:{
        model:'Users',
        key:'id'
      },
      defaultValue:2,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    authId:{
      type: Sequelize.INTEGER,
      references:{
        model:'Permissions',
        key:'authId'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }}
  )
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPermissions')
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

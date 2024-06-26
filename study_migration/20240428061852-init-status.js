'use strict';
const seed_db=require("../modules/seedDB")
const {Status}=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.createTable('Status', 
    { stateId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    stateName: {
      type: Sequelize.STRING,
      unique:true,
      allowNull:false
    }})
    .then(async()=>
      //fix seed DB
      {let adds=await seed_db.seed_data('Status')
      await Status.bulkCreate(adds)
       }
    ),
      queryInterface.addColumn("Users","state",{
      type: Sequelize.INTEGER,
      defaultValue:1,
      allowNull:false
      })
    ])
    
    await queryInterface.addConstraint("Users",{
      fields:["state"],
      type:"foreign key",
      references:{
        table:"Status",
        field:"stateId"
      },
      onDelete:"cascade",
      onUpdate:"cascade"
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','state')
    await queryInterface.dropTable('Status')
    
    /**
     * 
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

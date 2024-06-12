'use strict';
const seed_db=require("../modules/seedDB")
const models=require("../models")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let adds=await seed_db.seed_data('Status')
    await queryInterface.createTable('Status', 
    { statePk: {
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
    await models.Status.bulkCreate(adds)
    await queryInterface.addColumn("Users","state",{
      type: Sequelize.STRING,
      defaultValue:adds[0]["stateName"],
      allowNull:false
      })
    await queryInterface.addConstraint("Users",{
      fields:["state"],
      type:"foreign key",
      references:{
        table:"Status",
        field:"stateName"
      },
      onDelete:"cascade",
      onUpdate:"cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','state')
    await queryInterface.dropTable('Status')
  }
};

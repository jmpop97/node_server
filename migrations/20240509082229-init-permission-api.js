'use strict';

/** @type {import('sequelize-cli').Migration} */
const seed_db=require("../modules/seedDB")
const {PermissionAPI,API}=require("../models")
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
    let adds=await seed_db.seed_data('API')
    let api=adds.reduce((unique, item) => {
        return unique.includes(item.apiId) ? unique : [...unique, item.apiId]
      }, []);
    api=api.map(x=>{return {apiId:x}})
    await API.bulkCreate(api,{updateOnDuplicate: ["apiId"]})
    await PermissionAPI.bulkCreate(adds,{updateOnDuplicate: ["id"]})

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

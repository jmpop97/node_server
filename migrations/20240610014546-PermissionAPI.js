'use strict';
const seed_db=require("../modules/seedDB")
const models=require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let adds=await seed_db.seed_data('PermissionApi')
    let api=adds.reduce((unique, item) => {
          return unique.includes(item.apiName) ? unique : [...unique, item.apiName]
        }, []);
      api=api.map(x=>{return {apiName:x}})
    await queryInterface.createTable('APIs', 
      { 
        apiPk:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        apiName: 
        {
          type:Sequelize.STRING,
          unique:true,
          allowNull:false
        }
       });
    await queryInterface.createTable('Permission_APIs', 
       { 
        permissionApiPk: 
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
        apiName:{
          type: Sequelize.STRING,
          references:{
            model:'APIs',
            key:'apiName'
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        }
        });
    await models.API.bulkCreate(api,{updateOnDuplicate: ["apiPk"]})
    await models.Permission_API.bulkCreate(adds)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Permission_APIs')
    await queryInterface.dropTable('APIs')
  }
};

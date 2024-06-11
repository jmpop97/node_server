'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionAPI extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models.API,{foreignKey:"apiName",targetKey:"apiName"})
      this.belongsTo(models.Permission,{foreignKey:"authName",targetKey:"authName"})
    }
  }
  PermissionAPI.init(
    {
      permissionApiPk: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
      },
      apiName: {
        type:DataTypes.STRING,
        allowNull:false
      },
      authName:{
        type:DataTypes.STRING,
        allowNull:false
      }
     },
    {
    sequelize,
    modelName: 'Permission_API',
    timestamps:false,
  });
  return PermissionAPI;
};
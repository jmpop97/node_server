'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionAPI extends Model {

    static associate(models) {
      // define association here
    //   this.belongsTo(models.User,{foreignKey:"userId"})
    }
  }
  PermissionAPI.init(
    {
      id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      apiId: {
        type:DataTypes.STRING,
        allowNull:false
      },
      authName:{
        type:DataTypes.STRING,
      }
     },
    {
    sequelize,
    modelName: 'PermissionAPI',
    timestamps:false,
  });
  return PermissionAPI;
};
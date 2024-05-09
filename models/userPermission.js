'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'userId'});
      this.belongsTo(models.Permission,{foreignKey:'authName'});
    }
  }
  UserPermission.init({
    userId:{
    type: DataTypes.STRING,
    allowNull:false
    },
    authName:{
        primaryKey:true,
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:2
        },
  }, {
    sequelize,
    modelName: 'UserPermission',
    timestamps:false
  });
  return UserPermission;
};
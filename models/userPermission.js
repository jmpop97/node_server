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
      // this.belongsTo(models.Permission,{foreignKey:'authId'});
      // this.belongsToMany(models.Permission,{foreignKey:'AuthId'});
    }
  }
  UserPermission.init({
    id:{
      primaryKey:true,
      type:DataTypes.INTEGER,
      unique:true
    },
    userId:{
    type: DataTypes.STRING,
    },
    authId:{
        primaryKey:true,
        type: DataTypes.STRING,
        },
  }, {
    sequelize,
    modelName: 'UserPermission',
    timestamps:false
  });
  return UserPermission;
};
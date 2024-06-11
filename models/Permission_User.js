'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'userId',targetKey:"userId"});
      this.belongsTo(models.Permission,{foreignKey:'authName',targetKey:"authName"});
    }
  }
  Permission_User.init({
    permission_userPk:{          
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
    modelName: 'Permission_User',
    timestamps:false
  });
  return Permission_User;
};
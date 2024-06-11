'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:"userId",targetKey:"userId"})
    }
  }
  UserInfo.init({
    userInfoPk:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    userId:{
    type: DataTypes.STRING,
    unique:true,
    allowNull:false
    },
    birthday:{
      type: DataTypes.DATE(6)
    },
    intro:{
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'UserInfo',
  });
  return UserInfo;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIPLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:"userId"})
    }
  }
  UserIPLog.init(
    {
      id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
    userId:{
      type: DataTypes.STRING,
    },
    IP:{
      type: DataTypes.STRING,
      allowNull:false
    },
    url:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'UserIPLog',
    updatedAt:false,

  });
  return UserIPLog;
};
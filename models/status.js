'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User,{
        foreignKey:"state",
     })
      // define association here
    }
  }
  Status.init({
    statePk:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    stateName: {
      allowNull: false,
      unique:true,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'Status',
    createdAt:false,
    updatedAt:false
  });
  return Status;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    changedName: DataTypes.STRING,
    email: DataTypes.STRING,
    test1: DataTypes.STRING,
    test2: DataTypes.STRING,
    test3: DataTypes.STRING,
    test4: {type: DataTypes.STRING,
    allowNull: false}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
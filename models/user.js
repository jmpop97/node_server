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
      this.hasOne(models.UserInfo,{
        foreignKey:"userId",
      allowNull:true});
      this.hasMany(models.UserIPLog,{
        foreignKey:"userId",
      allowNull:true});
      this.belongsTo(models.Status,{
        foreignKey:"state",
      });
      this.hasMany(models.Permission_User,
        { foreignKey:"userId"});
      this.belongsToMany(
        models.Permission,{
          through:models.Permission_User,
          foreignKey:'userId',
          type:DataTypes.STRING
        }
      )
    }
  }
  User.init({
    id:{
    primaryKey:true,
    type: DataTypes.STRING,
    allowNull: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true,
      validate:{isEmail:true}
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
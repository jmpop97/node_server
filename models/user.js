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
        sourceKey:"userId"});
      this.hasMany(models.UserIPLog,{
        foreignKey:"userId",
      allowNull:true});
      this.belongsTo(models.Status,{
        foreignKey:"state",
      });
      this.hasMany(models.Permission_User,
        { foreignKey:"userId",sourceKey:"userId"});
      this.belongsToMany(
        models.Permission,{
          through:models.Permission_User,
          foreignKey:'userId',
          sourceKey:"userId"
        }
      )
    }
  }
  User.init({
    userPk:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    userId:{
      type: DataTypes.STRING,
      unique:true,
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
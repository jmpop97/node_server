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
      this.belongsTo(models.Status,{
        foreignKey:"state",
      });
      this.hasMany(models.UserPermission);
      // this.belongsToMany(
      //   models.Permission,{
      //     through:'UserPermission',
      //     as:"permissions",
      //   }
      // )
      // this.hasMany(models.UserPermission,{foreignKey:'id',allowNull:true})
      // this.belongsToMany(models.Permission,{
      // through:models.UserPermission,
      // foreignKey:'authId',
      // as:'permissions'},)
      // this.belongsToMany(models.Permission,{
      //   through:'UserPermission'
      // })
      // define association here
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
    state:{
      type: DataTypes.INTEGER,
      defaultValue:1,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //     this.hasMany(models.UserPermission,{
    //         foreignKey:'id'
    //     })
    //     this.belongsToMany(models.User,{
    //         through:"UserPermissions",
    //         foreignKey:'userId'
    //  })
      // define association here
    }
  }
  Permission.init({
    authId:{
    primaryKey:true,
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    authId: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permission;
};
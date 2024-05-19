'use strict';
const {
  Model
} = require('sequelize');
const Article_Tag = require('./Article_Tag');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.hasMany(models.Article_Tag,{foreignKey:"tag"})
      this.belongsToMany(models.Article,{
        through:models.Article_Tag,
        foreignKey:"tag",
      })
    }
  }
  Tag.init({
    tag:{
    primaryKey:true,
    type: DataTypes.STRING,
    allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Tag',
    timestamps:false
  });
  return Tag;}
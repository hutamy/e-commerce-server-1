'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Title is required'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Image URL is required'},
        isUrl: {msg: 'Image be an URL Format'}
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Status is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};
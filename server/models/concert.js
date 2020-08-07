'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Concert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Concert.belongsTo(models.User);
    }
  };
  Concert.init({
    name: DataTypes.STRING,
    venue: DataTypes.STRING,
    start: DataTypes.STRING,
    country: DataTypes.STRING,
    price: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Concert',
  });
  return Concert;
};

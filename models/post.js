'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      watches: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      edited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};

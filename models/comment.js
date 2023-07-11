'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  Comment.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      postId: DataTypes.INTEGER,
      replyCommentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};

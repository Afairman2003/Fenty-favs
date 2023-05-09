const User = require('../db/models/user');
const Posts = require('../db/models/posts');
const Likes = require('../db/models/likes');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Posts,
    Likes,

  };
  next();
};

module.exports = addModels;

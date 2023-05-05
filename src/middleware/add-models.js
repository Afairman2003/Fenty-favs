const User = require('../db/models/user');
const Posts = require('../db/models/posts');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Posts
  };
  next();
};

module.exports = addModels;

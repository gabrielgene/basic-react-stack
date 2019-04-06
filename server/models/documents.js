const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
  author: String,
  img: String,
  title: String,
  content: String,
  upvote: Boolean,
});

module.exports = mongoose.model('Document', DocumentSchema);

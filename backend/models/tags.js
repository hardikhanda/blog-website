const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

//module.exports = mongoose.model('Tag', TagSchema);
const Tag = mongoose.model('Tag', TagSchema, 'tags');

export { Tag };
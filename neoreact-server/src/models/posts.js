const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    createDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    likes:[String],
});

const Post = mongoose.model('Post', postSchema);

Post.createIndexes({
    title: 'text',
    body: 'text',
});

module.exports = Post;

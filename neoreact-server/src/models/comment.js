const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        replyComment: {
            type: String,
        },
        post: {
            type: mongoose.Types.ObjectId,
        },
        user: {
            _id: mongoose.Types.ObjectId,
            username: String,
        }
    },
    { timestamps: true },
);

CommentSchema.statics.findByPostId = function (postId) {
    return this.find({ 'post._id': postId });
};

const Comment = mongoose.model('Comment', CommentSchema);

Comment.aggregate([
    {"$group": { "post": "$_id", "count": {"$count": 1}}}
])


module.exports = Comment;

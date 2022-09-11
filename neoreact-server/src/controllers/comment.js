const Comment = require('../models/comment');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.checkObjID = async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: ObjectId.isValid(id) });
        return;
    }
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            res.status(404);
            return;
        }
        res.locals.comment = comment;
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: '投稿はありません' });
    }

    return next();
};

exports.checkOwnComment = (req, res, next) => {
    const { comment } = res.locals;
    const { user } = res.locals;
    if (user._id.toString() !== comment.user._id.toString()) {
        res.status(403);
        return;
    }
    return next();
};



exports.writeComment = async (req, res) => {
    const { commentInput, postId } = req.body;

    try {
        const comment = new Comment({
            replyComment: commentInput,
            post: postId,
            user: res.locals.user,
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    const { postId } = req.params;
    const objID = new ObjectId(postId);

    try {
        const comments = await Comment.find({post:objID}).sort({ commentedDate: -1 }).lean().exec();

        if (!comments) {
            res.status(404);
            return;
        }

        res.status(201).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { postId,id} = req.params;
    console.log(id)
    try {
         await Comment.findByIdAndRemove(id).exec();
        const comments =  await Comment.find({post:postId}).sort({ commentedDate: -1 }).lean().exec();
        console.log(comments)
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    
    const { postId,id } = req.params;
    const comment = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, comment, {
            new: true,
        }).exec();
        if(updatedComment){
             const comments =  await Comment.find({post:postId}).sort({ commentedDate: -1 }).lean().exec();
             res.status(200).json(comments);
        }
        console.log("Updated"+updatedComment)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const Post = require('../models/posts');

exports.updateLike = async (req, res) => {
    
    const {postId}=req.params;
    const likes = req.body;
    try {
        const updatedLike = await Post.findByIdAndUpdate(postId,{likes:likes},{ new: true}).exec();
        res.status(200).json(updatedLike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
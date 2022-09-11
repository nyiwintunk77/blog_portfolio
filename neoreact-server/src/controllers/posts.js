const Post = require('../models/posts');
const mongoose = require('mongoose');
const joi = require('joi');

const { ObjectId } = mongoose.Types;
const POSTS_IN_ONE_PAGE = 10;

exports.checkObjID = async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: ObjectId.isValid(id) });
        return;
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            res.status(404);
            return;
        }
        res.locals.post = post;
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: '포스트가 없습니다.' });
    }

    return next();
};

exports.checkOwnPost = (req, res, next) => {
    const { post } = res.locals;
    const { user } = res.locals;
    if (user._id.toString() !== post.user._id.toString()) {
        res.status(403);
        return;
    }
    return next();
};

exports.getPosts = async (req, res) => {
    const { tag, username, page, searchKeyword, option } = req.query;
    const pg = parseInt(page || '1', POSTS_IN_ONE_PAGE);
    const REG_EXP = searchKeyword && { $regex: new RegExp(searchKeyword) };

    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
        ...(searchKeyword ? (option === 'title' ? { title: REG_EXP } : { body: REG_EXP }) : {}),
    };

    if (page < 1) {
        res.status(400);
        return;
    }

    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 })
            .limit(POSTS_IN_ONE_PAGE)
            .skip((pg - 1) * POSTS_IN_ONE_PAGE)
            .lean()
            .exec();

        const jsonedPosts = posts.map((post) => ({
            ...post,
            body: post.body.length < 150 ? post.body : `${post.body.slice(0, 150)} ...more`,
        }));

        const postCount = await Post.countDocuments(query).exec();

        res.set('last-page', Math.ceil(postCount / POSTS_IN_ONE_PAGE));
        res.status(201).json(jsonedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPost = async (req, res) => {
    const schema = joi.object().keys({
        title: joi.string().required(),
        body: joi.string().required(),
        tags: joi.array().items(joi.string()),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error });
        return;
    }
    const { title, body, tags } = req.body;
    const post = new Post({
        title,
        body,
        tags,
        user: res.locals.user,
    });
    try {
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            res.status(404);
            return;
        }
        res.status(201).json(res.locals.post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    return;
};

// 삭제
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        res.status(200).json({ message: '삭제 완료' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// 수정
exports.updatePost = async (req, res) => {
    const schema = joi.object().keys({
        title: joi.string().required(),
        body: joi.string().required(),
        tags: joi.array().items(joi.string()),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error });
        return;
    }
    const { id } = req.params;
    const post = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {
            new: true,
        }).exec();
        res.status(200).res.json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

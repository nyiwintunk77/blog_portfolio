const express = require('express');
const router = express.Router();
const Post = require('../controllers/posts');
const Comment = require('../controllers/comment');
const Like = require('../controllers/like');
const middleware = require('../lib/jwtMW');

// 전체목록 가져오기
router.get('/', Post.getPosts);

// post 등록
router.post('/', middleware.checkLoggedIn, Post.createPost);

// id로 찾기
router.get('/:id', Post.checkObjID, Post.getPostById);

// 삭제
router.delete('/:id', middleware.checkLoggedIn, Post.checkObjID, Post.checkOwnPost, Post.deletePost);

// 수정
router.patch('/:id', middleware.checkLoggedIn, Post.checkObjID, Post.checkOwnPost, Post.updatePost);

//comment
router.post('/comment', middleware.checkLoggedIn, Comment.writeComment);

router.get('/comment/:postId', Comment.getComments);

router.delete('/comment/:postId/:id', middleware.checkLoggedIn, Comment.checkObjID, Comment.checkOwnComment, Comment.deleteComment);

router.patch('/comment/:postId/:id', middleware.checkLoggedIn, Comment.checkObjID, Comment.checkOwnComment, Comment.updateComment);

//like
router.patch('/like/:postId/',middleware.checkLoggedIn,Like.updateLike);

module.exports = router;

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comment from '../components/comment/Comment';
import CommentListWrite from '../components/comment/CommentListWrite';
import CommentWrite from '../components/comment/CommentWrite';
import {
  changeComment,
  removeComment,
  updateComment,
  writeComment,
} from '../modules/comment';


const CommentContainer = ({match}) => {
  const { postId } = match.params;
  
  const dispatch = useDispatch();

  const {
    loginUser,
    post,
    commentInput,
    commentList,
    error,
    loading,
  } = useSelector(
    ({ user, post, comment, loading }) => ({
      loginUser: user.user,
      post: post.post,
      commentInput: comment.commentInput,
      commentList: comment.commentList,
      error: comment.error,
      loading: loading['post/GET_POST'],
    })
  );

  const [click, setClick] = useState(false);

  const onClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    setClick(false);
  }, [post]);

  const onDelete=async(id)=>{
    try {
      await dispatch(removeComment({postId,commentId:id}));
    } catch (error) {
      console.log(error);
    }
  }

    const onEdit = useCallback((com,id)=>{
      dispatch(updateComment({postId,commentId:id,replyComment:com}));   
    },[dispatch,postId])

  const onChange = useCallback(
    (value) => {
      dispatch(changeComment(value));
    },
    [dispatch]
  );

  const postComment = useCallback(() => {
    const { _id: postId } = post;
    dispatch(
      writeComment({ commentInput, postId })
    );
  }, [dispatch, post, commentInput]);

  return (
    <>
      <Comment
        loading={loading}
        onClick={onClick}
        commentList={commentList}
        error={error}
      ></Comment>
      <CommentListWrite
        click={click}
        error={error}
        commentList={commentList}
        loginUser={
          loginUser && loginUser.username
        }
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <CommentWrite
        click={click}
        loginUser={
          loginUser && loginUser.username
        }
        onChange={onChange}
        postComment={postComment}
        post={post}
        commentValue={commentInput}
      />
    </>
  );
};

export default withRouter(CommentContainer);

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getPost,
  initPost,
  removePost,
} from '../modules/post';
import PostRead from '../components/post/PostRead';
import { withRouter } from 'react-router';
import EditDelete from '../components/post/EditDelete';
import { useMenu } from '../lib/useMenu';
import {
  getComment,
  initializeComment,
} from '../modules/comment';
import { oldPost } from '../modules/write';
import Like from 'components/like/Like';
import { updateLike } from 'lib/api';

const PostReadContainer = ({
  match,
  history,
}) => {
  const { postId } = match.params;
  const dispatch = useDispatch();

  const { user, post, error, loading } =
    useSelector(({ user, post, loading}) => ({
      user: user.user,
      post: post.post,
      error: post.error,
      loading: loading['post/GET_POST'],
    }));
  const outsideRef = useRef(null);
  const usernameRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useMenu(
    outsideRef,
    usernameRef
  );

  const {username}=user

  const onClickUser = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(initPost());
    };
  }, [dispatch, postId]);


  useEffect(() => {
    dispatch(getComment(postId));
    return () => {
      dispatch(initializeComment());
    };
  }, [dispatch, postId]);

  const [iine,setIine] = useState(false);
  const addlike=useRef([]);

  useEffect(()=>{
    if(post){
      addlike.current=post.likes
      setIine(addlike.current.includes(username));
    }
  },[post])

  const onClick =()=>{
    if(!iine){
      if(!addlike.current.includes(username)){
        addlike.current= addlike.current.concat(username);
      }
    }else{
        const index = addlike.current.findIndex((e)=>e===username);
        addlike.current.splice(index,1);
    }
    setIine(!iine);
  }

  useEffect(()=>{   
    return()=>{
      updateLike(postId,addlike.current)
    }
  },[dispatch,postId])


  const onRemove = async () => {
    try {
      await dispatch(removePost(postId));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () =>{
    dispatch(oldPost(post));
    history.push('/write');
  }

  const onTagClick = (tag) => {
    history.push(`/?tag=${tag}`);
  };

  const ownPost =
    (user && user._id) ===
    (post && post.user._id);
  
  return (
    <PostRead
      user={user}
      postId={postId}
      post={post}
      loading={loading}
      error={error}
      likes={<Like onClick={onClick} iine={iine} addlike={addlike.current}/>}
      onTagClick={onTagClick}
      usernameRef={usernameRef}
      outsideRef={outsideRef}
      isMenuOpen={isMenuOpen}
      onClickUser={onClickUser}
      editDelete={
        ownPost && (
          <EditDelete onEdit={onEdit} onRemove={onRemove} />
        )
      }
    />
  );
};

export default withRouter(PostReadContainer);

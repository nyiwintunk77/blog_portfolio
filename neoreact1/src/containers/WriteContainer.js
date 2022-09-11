import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { withRouter } from 'react-router';
import WriteButtons from '../components/write/WriteButtons';
import { postsList } from '../modules/posts';
import {
  changeField,
  createPost,
  initialize,
  updatePost,
} from '../modules/write';
import { MAX_BODY } from '../lib/constants';
import Tags from '../components/write/Tags';
import WriteForm from '../components/write/WriteForm';

const ButtonsContainer = ({ history }) => {
  const { title, body, tags, post, postError,oldpostId } =
    useSelector(({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      oldpostId:write.oldpostId,
    }));

  const dispatch = useDispatch();

  const [error, setError] = useState(true);

  const cantSubmit = 
    [title, body].includes('') ||
    body.length > MAX_BODY;

  const onSubmit = useCallback(() => {
    if (error) return;
     if(oldpostId){
      dispatch(updatePost({postId:oldpostId,title,body,tags}));
      history.push('/');
      return;
    }
    dispatch(createPost({ title, body, tags }));
  }, [dispatch, title, body, tags, error,oldpostId,history]);

  const checkField = useCallback(() => {
    if (cantSubmit) {
      setError(true);
      return;
    }
    setError(false);
  }, [cantSubmit]);

  const onGoBack = () => {
    history.goBack(); 
  };

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;

      dispatch(
        changeField({
          key: name,
          value,
        })
      );
    },
    [dispatch]
  );

  const onSubmitTags = useCallback(
    (localTags) => {
      dispatch(
        changeField({
          key: 'tags',
          value: localTags,
        })
      );
    },
    [dispatch]
  );

  useEffect(checkField, [body, checkField]);

  useEffect(() => {
    
    if (post) {
      dispatch(postsList({}));
      const { _id } = post;
      history.push(`/posts/${_id}`);
    }
    
    if (postError) {
      setError(postError.response.data.message);
    }
  }, [dispatch, history, post, postError]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      <WriteForm
        onChange={onChange}
        title={title}
        body={body}
      />
      <Tags onSubmitTags={onSubmitTags} />
      <WriteButtons
        onSubmit={onSubmit}
        onGoBack={onGoBack}
        error={error}
      ></WriteButtons>
    </>
  );
};

export default withRouter(ButtonsContainer);

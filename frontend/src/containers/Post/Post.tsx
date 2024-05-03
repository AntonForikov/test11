import {useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, CircularProgress, Grid, Paper, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {addComment, getComments, getPostById} from '../../store/post/postThunk';
import {selectComments, selectCommentsLoading, selectPostById, selectPostByIdLoading} from '../../store/post/postSlice';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import {Comment} from '../../types';
import {selectUser} from '../../store/user/userSlice';

const initialState = {
  text: ''
};
const Post = () => {
  const {postId} = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostById);
  const comments = useAppSelector(selectComments);
  const commentsLoading = useAppSelector(selectCommentsLoading);
  const loading = useAppSelector(selectPostByIdLoading);
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();
  const [comment, setComment] = useState<Comment>(initialState);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const getAllPostData = useCallback(async () => {
    if (postId) {
      await dispatch(getPostById(postId));
      dispatch(getComments(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    void getAllPostData();
  }, [getAllPostData, user, navigate]);

  const changeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setComment((prevState) => ({
      ...prevState,
        [name]: value
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.text[0] === ' ' || comment.text === '') {
      alert('You cant send empty comment or which begins from whitespace.');
    } else {
      if (postId) {
        const sendObj = {...comment, post: postId};
        await dispatch(addComment(sendObj));
        dispatch(getComments(postId));
      }
    }
  };

  return (
    <>
      <Grid container mt={2}>
        {
          loading
            ? <CircularProgress/>
            : <Grid container direction="column" alignItems="center">
              <Typography variant='h3'>{post?.title}</Typography>
              <Typography variant='h5'>{post?.description}</Typography>
              {commentsLoading && !loading
                ? <CircularProgress/>
                : !commentsLoading && comments.length === 0
                  ? <Alert sx={{marginTop: 2}}>There is no comments for this post</Alert>
                  : comments.map((comment) => {
                    return <Paper sx={{padding: 2, width: '100%', marginY: 2}} key={comment._id}>Commented
                      by {comment.user.username}: {comment.text}</Paper>;
                  })
              }
            </Grid>
        }
      </Grid>

      <form onSubmit={onFormSubmit}>
        <Grid container direction="column" spacing={2} marginBottom={2} maxWidth={600} margin='auto'>
          <Grid item xs>
            <TextField
              fullWidth
              variant="outlined"
              label="Add comment"
              name="text"
              value={comment.text}
              onChange={changeComment}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
)
  ;
};

export default Post;
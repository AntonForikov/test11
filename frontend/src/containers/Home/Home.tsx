import {Alert, CircularProgress, Grid} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import CardItem from '../../components/CardItem/CardItem';
import {selectPostList, selectPostListLoading} from '../../store/post/postSlice';
import {getPostList} from '../../store/post/postThunk';


const Home = () => {
  const postList = useAppSelector(selectPostList);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostListLoading);

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" direction='column' gap={3} marginTop={3}>
        {loading
          ? <CircularProgress/>
          : !loading && postList.length < 1
            ? <Alert severity="warning">There is no artists in database</Alert>
            : postList.map((post) => {
              return (
                <CardItem
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  username={post.user}
                  image={post.image}
                  date={post.date}
                  commentCount={post.commentCount}
                />
              );
            })
        }
      </Grid>
    </>

  );
};

export default Home;
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FileInput from './FileInput';
import {useNavigate} from 'react-router-dom';
import {Post} from '../../types';
import {newPost} from '../../store/post/postThunk';
import {selectUser} from '../../store/user/userSlice';

const initialMessage: Post = {
  title: '',
  description: '',
  image: null
};
const AddForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [post, setPost] = useState<Post>(initialMessage);
  const [fileName, setFileName] = useState('');
  const resetButtonRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const resetFileInput = () => {
    if (resetButtonRef.current) {
      resetButtonRef.current.click();
    }
  };

  const changeNewsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setPost(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
    if (files && files[0]) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post.image && post.description.trim() === '') {
      alert('Image or description must be filled.');
      return;
    }

    if (post.title[0] === ' ' || post.title === '') {
      alert("You can't send post title started from whitespace or it can't be empty!");
    } else {
      try {
        await dispatch(newPost(post));
        navigate('/');
      } catch (e) {
        console.error(e);
      } finally {
        resetFileInput();
        setPost(initialMessage);
        setFileName('');
      }
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2} marginBottom={2} maxWidth={600} margin='auto'>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            name="title"
            value={post.title}
            onChange={changeNewsHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            rows={4}
            multiline
            fullWidth
            variant="outlined"
            label="Description"
            name="description"
            value={post.description}
            onChange={changeNewsHandler}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            fileName={fileName}
            name="image"
            label="Image"
          />
        </Grid>
        <Grid item xs>
          <TextField
            type={'number'}
            fullWidth
            variant="outlined"
            label="Price"
            name="price"
            // value={post.description}
            // onChange={changeNewsHandler}
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              // id="demo-simple-select"
              value={'dfg'}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
            Send
          </Button>
        </Grid>
      </Grid>
      <input
        style={{display: 'none'}}
        ref={resetButtonRef}
        type="reset"
      />
    </form>
  );
};

export default AddForm;
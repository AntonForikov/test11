import {Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FileInput from './FileInput';
import {useNavigate} from 'react-router-dom';
import {Product} from '../../types';
import {getCategories, newProduct} from '../../store/product/productThunk';
import {selectUser} from '../../store/user/userSlice';
import {selectCategories} from '../../store/product/productSlice';

const initialProduct: Product = {
  title: '',
  description: '',
  image: null,
  price: 0,
  category: ''
};
const AddForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const [product, setProduct] = useState<Product>(initialProduct);
  const [fileName, setFileName] = useState('');
  const resetButtonRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [disabler, setDisabler] = useState(false);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const resetFileInput = () => {
    if (resetButtonRef.current) {
      resetButtonRef.current.click();
    }
  };

  const changeProductHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const {name, value} = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const changeSelectHandler = (e: SelectChangeEvent ) => {
    const {name, value} = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setProduct(prevState => ({
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

    if (fileName === '') {
      alert("Please choose an image of product");
    } else if (product.title[0] === ' ') {
      alert('Product title can not begins from whitespace');
    } else if (product.description[0] === ' ') {
      alert('Product description can not begins from whitespace');
    } else {
      try {
        setDisabler(true);
        await dispatch(newProduct(product));
        setDisabler(false);
        navigate('/');
      } catch (e) {
        console.error(e);
      } finally {
        resetFileInput();
        setProduct(initialProduct);
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
            value={product.title}
            onChange={changeProductHandler}
            required
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
            value={product.description}
            onChange={changeProductHandler}
            required
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
            InputProps={{ inputProps: { min: 1 }}}
            fullWidth
            variant="outlined"
            label="Price"
            name="price"
            value={product.price}
            onChange={changeProductHandler}
            required
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product.category}
              name='category'
              label="Category"
              onChange={changeSelectHandler}
              required
            >
              {categories.map((category) => {
                return <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" endIcon={<SendIcon/>} disabled={disabler}>
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
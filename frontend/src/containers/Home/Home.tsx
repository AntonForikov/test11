import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import CardItem from '../../components/CardItem/CardItem';
import {selectProductList, selectAllProductListLoading, selectCategories} from '../../store/product/productSlice';
import {getAllProductList, getCategories} from '../../store/product/productThunk';
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const productList = useAppSelector(selectProductList);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAllProductListLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProductList());
  }, [dispatch]);

  return (
    <>
      <Typography textAlign='center' variant='h4'>All items</Typography>
      <Grid container display='flex' direction='row' gap={3} marginTop={3}>
        <Grid item marginRight={3}>

          {categories.map((category) => {
            return<Typography
              key={category._id}
              sx={{cursor: 'pointer'}}
              onClick={() => navigate(`/category/${category._id}`)}
            >
              {category.title}
            </Typography>;
          })}
        </Grid>
        <Grid container justifyContent='center' alignItems="center" direction='row' gap={3}>
          {loading
            ? <CircularProgress/>
            : !loading && productList.length < 1
              ? <Alert severity="warning">There is no products in database</Alert>
              : productList.map((product) => {
                return (
                  <CardItem
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                  />
                );
              })
          }
        </Grid>
      </Grid>
    </>

  );
};

export default Home;
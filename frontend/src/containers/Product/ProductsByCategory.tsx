import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import CardItem from '../../components/CardItem/CardItem';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductsByCategory} from '../../store/product/productThunk';
import {selectProductByCategory, selectProductByCategoryLoading} from '../../store/product/productSlice';


const ProductsByCategory = () => {
  const {id} = useParams();
  const products = useAppSelector(selectProductByCategory);
  const loading = useAppSelector(selectProductByCategoryLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getProductsByCategory(id));
  }, [dispatch, id]);

  return (
    <>
      {products.length > 0 && <Typography textAlign='center' variant='h4'>{products[0].category.title}</Typography>}
      <Grid container display='flex' direction='row' gap={3} marginTop={3}>

        <Grid container justifyContent='center' alignItems="center" direction='row' gap={3}>
          {loading
            ? <CircularProgress/>
            : !loading && products.length < 1
              ? <Alert severity="warning">There is no products in database</Alert>
              : products.map((product) => {
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

export default ProductsByCategory;
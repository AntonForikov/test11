import {useNavigate, useParams} from 'react-router-dom';
import {CircularProgress, Grid} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {getProductById} from '../../store/product/productThunk';
import {selectUser} from '../../store/user/userSlice';
import {selectProduct, selectProductByIdLoading} from '../../store/product/productSlice';
import CardItem from '../../components/CardItem/CardItem';

const Product = () => {
  const {productId} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectProductByIdLoading);
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    if (productId) dispatch(getProductById(productId));
  }, [dispatch, productId]);

  return (
    <>
      <Grid container mt={2} justifyContent='center'>
        {
          loading
            ? <CircularProgress/>
            : product && <CardItem
            productMode
            id={product._id}
            price={product.price}
            image={product.image}
            title={product.title}
            sellerName={product.user.displayName}
            sellerUsername={product.user.username}
            sellerPhoneNumber={product.user.phoneNumber}
            sellerId={product.user._id}
          />
        }
      </Grid>
    </>
)
  ;
};

export default Product;
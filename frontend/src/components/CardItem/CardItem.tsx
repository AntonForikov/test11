import {
  Button,
  Card, CardContent, CardHeader,
  CardMedia, Grid, styled,
  Typography,
} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png';
import React, {useState} from 'react';
import {apiUrl} from '../../constants';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/user/userSlice';
import {deleteProduct} from '../../store/product/productThunk';

interface Props {
  id: string,
  title: string,
  image: string | null,
  price: string,
  productMode?: boolean,
  sellerName?: string,
  sellerUsername?: string,
  sellerPhoneNumber?: string,
  sellerId?: string
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
});

const CardItem: React.FC<Props> = ({
  id,
  title,
  image,
  price,
  productMode = false,
  sellerName,
  sellerPhoneNumber,
  sellerUsername,
  sellerId
}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [disabler, setDisabler] = useState(false);

  let cardImage = no_image_available;

  if (image) cardImage = `${apiUrl}/${image}`;

  const onCardClick = () => {
    navigate(`/product/${id}`);
  };

  const onDelete = async () => {
    if (user?._id === sellerId) {
      setDisabler(true);
      await dispatch(deleteProduct(id));
      setDisabler(false);
      navigate('/');
    } else {
      alert('You cant delete not your product');
    }
  };

  return (
    <Grid item xs md={3} lg={3} sx={{cursor: 'pointer'}} onClick={onCardClick}>
      <Card>
        <CardHeader title={title} sx={{textAlign: 'center'}}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <Typography>
            Price: {price} som
          </Typography>
          {
            productMode &&
            <Box>
              <Typography>
                Seller Username: {sellerUsername}
              </Typography>
              <Typography>
                Seller Display Name: {sellerName}
              </Typography>
              <Typography>
                Seller Phone: {sellerPhoneNumber}
              </Typography>
            </Box>
          }
          {(user?._id === sellerId && productMode) &&
            <Button
              variant='outlined'
              color='error' sx={{marginTop: 2}}
              onClick={onDelete}
              disabled={disabler}
            >
              Delete
            </Button>}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardItem;
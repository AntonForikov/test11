import {
  Card, CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png';
import React from 'react';
import {apiUrl} from '../../constants';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import {format} from 'date-fns';

interface Props {
  id: string,
  title: string,
  image: string | null,
  username: string
  date: string,
  commentCount: string
}

const CardItem: React.FC<Props> = ({id, title, image, username, date, commentCount}) => {
  const navigate = useNavigate();
  let cardImage = no_image_available;

  if (image) cardImage = `${apiUrl}/${image}`;

  const onCardClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <Card style={{display: 'flex', width: '100%', cursor: 'pointer'}} onClick={onCardClick}>
      <CardMedia
        component="img"
        sx={{width: 151, height: 100}}
        image={cardImage}
        alt={title}
      />
      <CardContent component="div" style={{paddingBottom: 0}}>
        <Box>
          <Typography component="div" variant="inherit">
            {format(date, 'dd.MM.yyyy hh:mm:ss')} by {username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Title: {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Comments: {commentCount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;
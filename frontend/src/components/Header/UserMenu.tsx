import {Button, Menu, MenuItem} from '@mui/material';
import {UserFromDb} from '../../types';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../store/user/userThunk';

interface Props {
  user: UserFromDb
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color='inherit'
        onClick={handleClick}
      >
        Hello {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to='/newItem' onClick={handleClose}>Crate New Item</MenuItem>
        <MenuItem component={Link} to='/' onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
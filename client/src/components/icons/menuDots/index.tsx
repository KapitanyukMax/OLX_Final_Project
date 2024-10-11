import React from 'react';
import menu from '../../../assets/icons/solar_menu-dots-bold.svg';
import { Box } from '@mui/material';

interface MenuDotsIconProps {
  onClick?: () => void;
}

const MenuDotsIcon: React.FC<MenuDotsIconProps> = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '25px',
        height: '25px',
        cursor: 'pointer',
      }}
    >
      <img src={menu} alt="menu dots icon" />
    </Box>
  );
};

export default MenuDotsIcon;

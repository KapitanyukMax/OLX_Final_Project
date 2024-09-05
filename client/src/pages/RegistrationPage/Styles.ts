import { SxProps, Theme } from '@mui/material';

export const iconBoxStyles: SxProps<Theme> = {
  border: '1px solid black',
  padding: '16px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
};
